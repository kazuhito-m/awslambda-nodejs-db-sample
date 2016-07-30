'use strict';
const gulp = require('gulp');
const gulpUtil = require('gulp-util');
const espower = require("gulp-espower");
const mocha = require("gulp-mocha");
const istanbul = require('gulp-istanbul');
const zip = require('gulp-zip');
const del = require('del');
const mkdirp = require('mkdirp');
const install = require('gulp-install');
const runSequence = require('run-sequence');
const awsLambda = require('node-aws-lambda');
const prettify = require('gulp-jsbeautifier');
const eslint = require('gulp-eslint');
const plumber = require('gulp-plumber');
const plato = require('gulp-plato');
const through = require('through2');
const watch = require('gulp-watch');
const changed = require('gulp-changed');
const rsync = require('gulp-rsync');
const fs = require('fs');

// 定数的pathマップ
const paths = {
    mains: './src/main/*.js',
    main_dir: './src/main',
    models: './src/main/models/*.js',
    configs: 'src/main/config/*',
    srcs: './src/**',
    src_dir: './src',
    work_dir: './work',
    work_mains: './work/main/*.js',
    work_tests: './work/test/*.js',
    ps_tests: './work/power-assert-test/*.js',
    ps_test_dir: './work/power-assert-test/',
    coverage_dir: './coverage',
    report_dir: './report',
    dist_dir: './work/dist',
    dist_all: './work/dist/**/*',
    format_dir: 'work/format'
};

let isFormating = false;

// distディレクトリのクリーンアップと作成済みのdist.zipの削除
gulp.task('clean', (cb) => {
    return del([paths.work_dir, paths.coverage_dir, paths.report_dir], cb);
});

// AWS Lambdaファンクション本体(index.js)をdistディレクトリにコピー
gulp.task('js', () => {
    return gulp.src(
            [paths.mains, paths.models, paths.configs], {
                base: paths.main_dir
            })
        .pipe(gulp.dest(paths.dist_dir));
});

// AWS Lambdaファンクションのデプロイメントパッケージ(ZIPファイル)に含めるnode.jsパッケージをdistディレクトリにインストール
// ({production: true} を指定して、開発用のパッケージを除いてインストールを実施)
gulp.task('node-mods', () => {
    return gulp.src('./package.json')
        .pipe(gulp.dest(paths.dist_dir))
        .pipe(install({
            production: true
        }));
});

// デプロイメントパッケージの作成(distディレクトリをZIP化)
gulp.task('zip', () => {
    return gulp.src([paths.dist_all, '!' + paths.dist_dir + '/package.json'])
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest(paths.work_dir));
});

// AWS Lambdaファンクションの登録(ZIPファイルのアップロード)
// (既にが登録済みの場合はの内容を更新)
gulp.task('upload', (callback) => {
    awsLambda.deploy(paths.work_dir + '/dist.zip', require("./lambda-config.js"), callback);
});

gulp.task('deploy', (callback) => {
    return runSequence(
        ['clean'], ['js', 'node-mods'], ['zip'], ['upload'],
        callback
    );
});

// テスト周り

// ためしに「テスト開始前に本体側をソースフォーマット」してみる。具合が悪けりゃ変える。
gulp.task('test-src-copy', () => {
    mkdirp(paths.work_dir);
    return gulp.src([paths.srcs])
        .pipe(gulp.dest(paths.work_dir));
});

// 普通のassertで書かれたテストを、pwoer-assertで書いたテストへトランスパイル。
gulp.task('test-transpile-power-assert', () => {
    return gulp.src(paths.work_tests)
        .pipe(espower())
        .pipe(gulp.dest(paths.ps_test_dir));
});

// カバレッジに必要な装備の初期設定。
gulp.task('test-mapping-coverage-src', () => {
    return gulp.src([paths.work_mains])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

// テスト実行。その際、テストが成功していればカバレッジレポートを作成。
gulp.task('unit-test', () => {
    return gulp.src([paths.ps_tests], {
            read: false
        })
        .pipe(mocha({
            reporter: 'list'
        }))
        .on('error', gulpUtil.log)
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({
            thresholds: {
                global: 10
            }
        }));
});

gulp.task('test', (cb) => {
    return runSequence(
        'clean',
        'static-analysis-eslint', // コードフォーマットがズタズタにならないため、事前にESLintでチェック。
        'format',
        'test-src-copy',
        'test-transpile-power-assert',
        'test-mapping-coverage-src',
        'unit-test',
        'static-analysis-plato',
        cb
    );
});



// ソースフォーマット周り

// 下で定義しなおし。
// gulp.task('src-format', function() {
//     return gulp.src(
//             [paths.srcs], {
//                 base: paths.src_dir
//             })
//         .pipe(prettify({
//             mode: 'VERIFY_AND_WRITE'
//         }))
//         .pipe(gulp.dest(paths.src_dir));
// });

gulp.task('settings-format', () => {
    return gulp.src(['./*.js'])
        .pipe(prettify())
        .pipe(gulp.dest('./'));
});

gulp.task('format', (cb) => {
    if (isFormating) {
        console.log('ソースフォーマット直後のため、抑制。');
        return runSequence();
    }
    isFormating = true;
    return runSequence(
        'src-format',
        'settings-format',
        cb
    );
});

// 静的解析

// ESLintは「コンパイルがわり」に使う(構文おかしかったらコケてくれるように)
gulp.task('static-analysis-eslint', () => {
    return gulp.src([paths.mains])
        .pipe(eslint({
            useEslintrc: true
        })) // .eslintrc を参照
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
});

// Platoは「テスト終わった後の解析」に使用する。
gulp.task('static-analysis-plato', () => {
    return gulp.src(paths.mains)
        .pipe(plato('report', {
            complexity: {
                trycatch: true
            }
        }));
});

// 「開発時にローカルでテスト回す(CIする)ような常駐タスク

gulp.task('all-test-with-notify', () => {
    return gulp.src(['./'])
        .pipe(plumber({
            // エラーをハンドル
            errorHandler: (error) => {
                const taskName = 'test';
                const title = '[task]' + taskName + ' ' + error.plugin;
                const errorMsg = 'error: ' + error.message;
                // ターミナルにエラーを出力
                console.error(title + '\n' + errorMsg);
            }
        }))
        .pipe(through.obj((file, encoding, callback) => {
            runSequence(
                ['test'], (error, two) => {
                    console.log('コールバックが呼ばれるタイミングは、今');
                    console.log("ふたつ目のコールバック" + two);
                    if (error === undefined) {
                        return false;
                    }
                    console.log("出てくるものはこれ: [" + error + "] 終わり")
                    console.log("message: [" + error.message + "] 終わり");
                    console.log("plugin : [" + error.plugin + "] 終わり");
                    let properties;
                    for (var prop in error) {
                        properties += prop + "=" + error[prop] + "\n";
                    }
                    // console.log("プロパテイ一覧 : " + properties)
                    return false;
                }
            );
            callback(null, file);
        }))
});

gulp.task('sample', () => {
    if (isFormating) {
        console.info('コードフォーマット中のため、ランニング自体を抑制。');
        return;
    }
    return runSequence(
        ['test'], (error, two) => {
            isFormating = false;
            console.log('コールバックが呼ばれるタイミングは、今');
            console.log("ふたつ目のコールバック" + two);
            if (error === undefined) {
                return;
            }
            console.log("出てくるものはこれ: [" + error + "] 終わり")
            console.log("message: [" + error.message + "] 終わり");
            console.log("plugin : [" + error.plugin + "] 終わり");
            let properties;
            for (var prop in error) {
                properties += prop + "=" + error[prop] + "\n";
            }
            // console.log("プロパテイ一覧 : " + properties)
        }
    );
});

gulp.task('develop', () => {
    return watch(paths.srcs, {
        ignoreInitial: true,
        readDelay: 500 // 再帰するので抑制を狙ったが…いまいち効力が解らない    
    }, (event) => {
        // gulp.start('all-test-with-notify');
        gulp.start('sample');
    });
});

// コードフォーマット ＆ 差分だけソース側に書き戻し機能。

gulp.task('formating-and-dump', () => {
    return gulp.src(
            [paths.srcs], {
                base: paths.src_dir
            })
        .pipe(prettify({
            mode: 'VERIFY_AND_WRITE'
        }))
        .pipe(gulp.dest(paths.format_dir));
});

function fileCopy(src, dist) {
    const r = fs.createReadStream(src);
    const w = fs.createWriteStream(dist);
    r.pipe(w);
}

function diff(src, dest) {
    return fs.readFileSync(src, 'utf-8') !== fs.readFileSync(dest, 'utf-8');
}

// 指定されたディレクトリから再帰的にファイルを抽出し、コールバックに投げ込む。
function directoryWork(path, fileCallback) {
    fs.readdir(path, (err, files) => {
        files.forEach((file) => {
            const fullPath = path + '/' + file;
            if (fs.statSync(fullPath).isDirectory()) {
                directoryWork(fullPath, fileCallback); // ディレクトリなら再帰
            } else {
                fileCallback(fullPath); // ファイルならコールバックで通知
            }
        });
    });
}

gulp.task('diff-and-copyfile', () => {
    directoryWork(paths.format_dir, (filePath) => {
        const mainPath = filePath.replace(paths.format_dir, paths.src_dir);
        if (diff(filePath, mainPath)) {
            console.log('Code formatting : ' + mainPath);
            fileCopy(filePath　, mainPath);
        }
    });
});

gulp.task('src-format', (cb) => {
    return runSequence(
        'formating-and-dump',
        'diff-and-copyfile',
        cb
    );
});