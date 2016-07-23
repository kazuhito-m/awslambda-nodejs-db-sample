const gulp = require('gulp');
const zip = require('gulp-zip');
const del = require('del');
const install = require('gulp-install');
const runSequence = require('run-sequence');
const awsLambda = require('node-aws-lambda');

// distディレクトリのクリーンアップと作成済みのdist.zipの削除
gulp.task('clean', (cb) => {
  return del(['./dist', './dist.zip'], cb);
});

// AWS Lambdaファンクション本体(index.js)をdistディレクトリにコピー
gulp.task('js', () => {
  return gulp.src('index.js')
    .pipe(gulp.dest('dist/'));
});

// AWS Lambdaファンクションのデプロイメントパッケージ(ZIPファイル)に含めるnode.jsパッケージをdistディレクトリにインストール
// ({production: true} を指定して、開発用のパッケージを除いてインストールを実施)
gulp.task('node-mods', () => {
  return gulp.src('./package.json')
    .pipe(gulp.dest('dist/'))
    .pipe(install({production: true}));
});

// ORマッパー"sequelize"のソースファイル系コピー
gulp.task('sequelize-srcs', () => {
  return gulp.src('./models/*.js')
    .pipe(gulp.dest('dist/models/'));
});

// ORマッパー"sequelize"の設定ファイル系コピー
gulp.task('sequelize-config', () => {
  return gulp.src('./config/*')
    .pipe(gulp.dest('dist/config/'));
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
    ['js', 'node-mods', 'sequelize-srcs', 'sequelize-config'],
    ['zip'],
    ['upload'],
    callback
  );
});