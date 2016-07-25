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

// 定数的pathマップ
const paths = {
  mains: "./src/main/*.js",
  srcs: "./src/**",
  work_dir: "./work",
  work_mains: "./work/main/*.js",
  work_tests: "./work/test/*.js",
  ps_tests: "./work/power-assert-test/*.js",
  ps_test_dir: "./work/power-assert-test/",
  coverage_dir: "./coverage"
};

// distディレクトリのクリーンアップと作成済みのdist.zipの削除
gulp.task('clean', (cb) => {
  return del(['./dist', './dist.zip'], cb);
});

// AWS Lambdaファンクション本体(index.js)をdistディレクトリにコピー
gulp.task('js', () => {
  return gulp.src(
    ['src/main/*.js', 'src/main/models/*.js', 'src/main/config/*.json'],
    { base: 'src/main' })
    .pipe(gulp.dest('dist/'));
});

// AWS Lambdaファンクションのデプロイメントパッケージ(ZIPファイル)に含めるnode.jsパッケージをdistディレクトリにインストール
// ({production: true} を指定して、開発用のパッケージを除いてインストールを実施)
gulp.task('node-mods', () => {
  return gulp.src('./package.json')
    .pipe(gulp.dest('dist/'))
    .pipe(install({ production: true }));
});

// デプロイメントパッケージの作成(distディレクトリをZIP化)
gulp.task('zip', () => {
  return gulp.src(['dist/**/*', '!dist/package.json'])
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('./'));
});

// AWS Lambdaファンクションの登録(ZIPファイルのアップロード)
// (既にが登録済みの場合はの内容を更新)
gulp.task('upload', (callback) => {
  awsLambda.deploy('./dist.zip', require("./lambda-config.js"), callback);
});

gulp.task('deploy', (callback) => {
  return runSequence(
    ['clean'],
    ['js', 'node-mods'],
    ['zip'],
    ['upload'],
    callback
    );
});

// テスト周り

gulp.task('test-clean', (cb) => {
  return del([paths.work_dir, paths.coverage_dir], cb);
});

gulp.task('test-src-copy', ['test-clean'], () => {
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
  return gulp.src([paths.ps_tests], { read: false })
    .pipe(mocha({ reporter: 'list' }))
    .on('error', gulpUtil.log)
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 10 } }));
});
