# 参照

参考にしたサイト、記事、紙媒体を記録するメモ。

## NPMまわり

- [npmアップデート](http://parashuto.com/rriver/tools/updating-node-js-and-npm)

## AWS Lambda & gulp

- [AWS Lambdaファンクションのデプロイ](http://dev.classmethod.jp/cloud/aws/how-to-deploy-a-lambda-function-with-gulp/)
- [Coffie Scriptの場合](http://qiita.com/penta515/items/450129b6e994d348fa81)
- [gulp-awslambdaでデプロイする場合](http://qiita.com/u-minor/items/17802910bcf54e10625f)
- [始めの一歩](https://osdn.jp/magazine/12/04/11/0618228/2)
- [gulp でディレクトリ構造を維持したコピー](http://akabeko.me/blog/2015/01/gulp-copy-keep-dir-structure/)
- []()
- []()
- []()
- []()

## AWS Lambda & API Gateway の基本的なところ

- [API作成から動作確認まで](http://dev.classmethod.jp/cloud/aws/api-gateway/)
- [日本語を扱う](http://dev.classmethod.jp/cloud/aws/aws-lambda-api-gateway-ja/)

## ESLint

- [最初の一歩](http://qiita.com/mysticatea/items/f523dab04a25f617c87d)

## JS Beautifier

- [本家](https://github.com/beautify-web/js-beautify)
- [使ったサイト](https://syncer.jp/js-prettyprint)

## カバレッジ(主にistanbul)

- [カバレッジを取る](http://qiita.com/iwata-n@github/items/1e8f629eb5b429a49e6d)

## Lambda -> RDS 間の通信許可

基本、普通に作る or 「以前の機能」であれば「RDSをIP全開放でないとアクセス出来ない」となる。

これではセキュリティ的に問題で、本当は「Lambdaと"とあるIP"だけアクセス出来る」が理想。

そのための手法をスクラップする。

- [AWS LambdaのVPCアクセス](http://qiita.com/Keisuke69/items/1d84684f0511a062e968)
- [AWS LambdaでVPC越しにRDSを見る方法](http://qiita.com/yoshidasts/items/a369f89d34f57ea67aad)

## DBテストについて(単体テストでないもの)

- [node.jsでDB周りのテストをする](http://yume-build.com/blog/archives/307)

## DBマイグレーション

- 種類
  - [sequelizejs(本家サイト)](http://docs.sequelizejs.com/en/latest/)

- [sequelizeのmigrationメモ](http://qiita.com/HirokiMiyaoka@github/items/972c42f1d5697045f70b)
- [Sequelizeを使ってみた](http://polidog.jp/2015/12/19/sequelizejs/)
- [Sequelizeでマイグレーションにファイルを使う方法](http://stackoverflow.com/questions/21105748/sequelize-js-how-to-use-migrations-and-sync)
- [Node, Postgres, and Sequelize](http://mherman.org/blog/2015/10/22/node-postgres-sequelize/#.V5QfWXWLTec)

## ORマッパー

- 種類的には…
  - Sequelize(DBマイグレーションも出来る)
  - Bookshelf.js
  - Lovefiled
  - Conclusions
  - Waterline
  - Knex(クエリビルダ的な性格)

- [種類のレポート(新しい目)](https://www.sitepoint.com/3-javascript-orms-you-might-not-know/)

## リソースファイル系(と自分で決めたもの)の扱いについて

- [Node.jsでのメッセージリソース管理を考える](http://qiita.com/okunishinishi@github/items/68b3c8e12ea8f5741387)

## モジュール分割・結合

- [UglifyJSでjsファイルの最適化](http://dev.classmethod.jp/server-side/node-js-server-side/uglifyjs/)
  - ただし、LambdaではHTML的なjsとは扱いが違うから、圧縮結合しなくて良いのでは？
- [Gulp concatとuglify](http://chaika.hatenablog.com/entry/2015/08/21/174941)
- [ライブラリに分割](http://gorogoronyan.web.fc2.com/htmlsample/nodejs2_3.html)

## 純粋JavaScript(EcmaScript)Tips

- [配列forEach](http://ism1000ch.hatenablog.com/entry/2014/07/30/024635)
- [(無いけど)クラスの作り方](http://blog.naka-sys.okinawa/node-js-class/)
- [(無いけど)クラスに対するプロパティの考え方](http://qiita.com/cocottejs/items/35e0edef71d8c0fc3348)
- [例外の考え方](http://d.hatena.ne.jp/kazuhooku/20120420/1334891656)
- ["use strict"（厳格モード）を使うべきか？](http://analogic.jp/use-strict/)
