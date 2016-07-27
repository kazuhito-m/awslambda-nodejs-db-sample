# AWS Lambda and Node.js and DB(PostgreSQL) Sample

## Latest integration

+ master : XXX by Wercker

## What's this

以下の組み合わせのサンプル。

- AWS Lambda
- Node.js
- PostgreSQL(pg)
- gulp

使いまわせることを期待して課題に対して解決するよう作っています。

## Requirement

- Node.js : v0.12.7  or Later
- npm : 2.11.3  or Later
- AWS SDK 用の `.aws/credentials` が設定されていること

## Setup for Develop

1. `npm install`
0. `npm test`

上記がエラー無く動けば、Setup完了。

## Task commands

### Deploy

- `npm run deploy`

### Developing mode

- `npm run develop`

常駐し、ファイルが変化があるたびにフォーマット、テスト、カバレッジ、静的解析など行います。

### Test

- `npm test`

## Bibliography

[こちら](./doc/REFERENCE_PUBS.md)

## Author

+ [kazuhito_m](https://twitter.com/kazuhito_m)
