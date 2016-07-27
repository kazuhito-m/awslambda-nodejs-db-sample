# 参照

参考にしたサイト、記事、紙媒体を記録するメモ。

## NPMまわり

- [npmアップデート](http://parashuto.com/rriver/tools/updating-node-js-and-npm)

## AWS Lambda & gulp

- [AWS Lambdaファンクションのデプロイ](http://dev.classmethod.jp/cloud/aws/how-to-deploy-a-lambda-function-with-gulp/)
- [Coffie Scriptの場合](http://qiita.com/penta515/items/450129b6e994d348fa81)
- [gulp-awslambdaでデプロイする場合](http://qiita.com/u-minor/items/17802910bcf54e10625f)
- [始めの一歩](https://osdn.jp/magazine/12/04/11/0618228/2)

## guip回り

- [run-sequence](https://www.npmjs.com/package/run-sequence)
- [gulp でディレクトリ構造を維持したコピー](http://akabeko.me/blog/2015/01/gulp-copy-keep-dir-structure/)
- [タスクランナーgulp.js最速入門](http://blog.anatoo.jp/entry/20140420/1397995711)
- [gulpタスク実行中にエラーが出たらデスクトップ通知を出す](http://qiita.com/nakajmg/items/8add9c58ea28a8f31eed)
- [gulpタスクを終了させない為の「gulp-plumber」](http://blog.webcreativepark.net/2014/05/14-112523.html)
- [途中のタスクが死ねば止まるが、watchは止まらない](http://chaika.hatenablog.com/entry/2015/09/10/070000)

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
- [sequelizeによるマイグレーションの方法](http://needtec.exblog.jp/22741115/)
- [Sequelize本家サイト](http://docs.sequelizejs.com/en/latest/docs/instances/)

## ORマッパー

- 種類的には…
  - Sequelize(DBマイグレーションも出来る)
  - Bookshelf.js
  - Lovefiled
  - Conclusions
  - Waterline
  - Knex(クエリビルダ的な性格)

- [種類のレポート(新しい目)](https://www.sitepoint.com/3-javascript-orms-you-might-not-know/)

## テスト周り

- [mocha & shuld導入](http://www.ie-kau.net/entry/2016/05/10/mocha_%2B_should_js%E3%81%A7Node_js%E3%81%AE%E3%83%86%E3%82%B9%E3%83%88%E3%82%92%E6%9B%B8%E3%81%8F)
  - 今回、結果確認はよりUnitTest寄りの`power-assert`でやろうと思っているので、shuldは見送り
- [mocha + power-assert環境の構築](http://qiita.com/gitseitanaka/items/ea47d261284879a1d774)
- [intelli-espower-loader本家](https://github.com/power-assert-js/intelli-espower-loader)
- [power-assertの使い方](http://efcl.info/2014/0406/res3809/)
- [node.jsでテストのカバレッジを取る](http://qiita.com/iwata-n@github/items/1e8f629eb5b429a49e6d)
- [ChaiJS公式](http://qiita.com/iwata-n@github/items/1e8f629eb5b429a49e6d)

## 静的解析

### ESLint系

- [gulp で eslint 設定とコード チェック環境の共有](http://qiita.com/ynunokawa/items/5471ff84c83104450ecb)
- [http://www.npmtrends.com/eslint-plugin-node](https://www.versioneye.com/nodejs/eslint-plugin-node/1.4.0)
  - node.jsをチェックするには、nodeのバージョンを教えないといけないので、`package.json` に `engings` 指定が必要

### Plato系
   
- [gulp-plato(公式)](https://github.com/sindresorhus/gulp-plato)
- [platoによるコードメトリックスの収集](http://needtec.exblog.jp/22719385/)
  - ESLintを使いたいのだが、platoの静的解析機構がjshintのため、しょうがなくその仕込み
    - [jshintに es6 を指定する方法](http://stackoverflow.com/questions/27441803/why-does-jshint-throw-a-warning-if-i-am-using-const)
    - [JSHint Options](http://jshint.com/docs/options/)  

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
- [Google流 JavaScript におけるクラス定義の実現方法](http://www.yunabe.jp/docs/javascript_class_in_google.html)
- [export(本家マニュアル)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/export)
- [クラスの落とし穴シリーズ](http://qiita.com/cocottejs/items/f7cb629ad17de04bf2fc)
- [Node.js : exports と module.exports の違い（解説編）](http://d.hatena.ne.jp/jovi0608/20111226/1324879536)
- [ES6におけるimportとrequireの扱い](http://sakamock.hatenablog.com/entry/2016/02/03/091623)
  - babelを使わない限り、nodeをいくら最新にしてもES6が完全に使えるわけではない…ので今回はレガシーな記述で。
- [ES6使う時のbabel周り(英語)](http://mammal.io/articles/using-es6-today/)
- [Node-v0.12からデフォルトでES6の一部が使えるようになった](http://d.hatena.ne.jp/jovi0608/20140418/1397789018)