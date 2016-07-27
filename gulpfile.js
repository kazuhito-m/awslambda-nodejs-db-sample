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
    dist_dir: './work/dist',
    dist_all: './work/dist/**/*'
};

// distディレクトリのクリーンアップと作成済みのdist.zipの削除
gulp.task('clean', (cb) => {
    return del([paths.work_dir, paths.coverage_dir], cb);
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

gulp.task('test-src-copy', ['clean'], () => {
    mkdirp(paths.work_dir);
    return gulp.src([paths.srcs])
        .pipe(gulp.dest(paths.work_dir));
});

// 普通のassertで書かれたテストを、pwoer-assertで書いたテストへトランスパイル。
gulp.task('test-transpile-power-assert', ['test-src-copy'], () => {
    return gulp.src(paths.work_tests)
        .pipe(espower())
        .pipe(gulp.dest(paths.ps_test_dir));
});

// カバレッジに必要な装備の初期設定。
gulp.task('test-mapping-coverage-src', ['test-transpile-power-assert'], () => {
    return gulp.src([paths.work_mains])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

// テスト実行。その際、テストが成功していればカバレッジレポートを作成。
gulp.task('test', ['test-mapping-coverage-src'], () => {
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

// 静的解析・ソースキープ周り

gulp.task('src-format', function() {
      return gulp.src(
            [paths.srcs], {
                base: paths.src_dir
            })
        .pipe(prettify())
        .pipe(gulp.dest(paths.src_dir));
});

gulp.task('settings-format', function() {
      return gulp.src(['./*.js'])
        .pipe(prettify())
        .pipe(gulp.dest('./'));
});

gulp.task('format', (cb) => {
    return runSequence(
        ['src-format', 'settings-format'],
        cb
    );
});

