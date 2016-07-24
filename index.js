'use strict';

const Condition = require('./condition');
const Converter = require('./converter');

process.env.NODE_ENV = 'production';  // 外部化してないので、無理にここに書いておく。

exports.handler = (event, context) => {

  // API Gateway & Lambda に来た「JSONパラメータ」を
  // バリデーションかつ検索用オブジェクト化。
  const converter = new Converter();
  const condition = new Condition();
  const errCode = converter.setAndValidation(event, condition);
  if (errCode !== 0) {
    context.succeed({ result: errCode });
    return;
  }

  const models = require('./models/index');

  // ORM用の「WHERE条件オブジェクト」作り。
  const wheres = {};
  if (condition.productName !== null) {
    wheres.productName = { $iLike: '%' + condition.productName + '%' };
  }
  if (condition.miuraUse !== null) {
    wheres.miuraUse = condition.miuraUse;
  }
  const findSettings = {};
  if (Object.keys(wheres).length > 0) {
    findSettings.where = wheres;
  }

  // 検索を実行し、結果のオブジェクトをJSON化してレスポンスとして返す。
  models.AwsProduct.findAll(findSettings).then((records) => {
    context.succeed({ result: 0, data: records });
  });

};