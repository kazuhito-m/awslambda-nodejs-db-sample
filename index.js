'use strict';
process.env.NODE_ENV = 'production';  // 外部化してないので、無理にここに書いておく。
const Condition = require('./condition');

exports.handler = (event, context) => {

  // API Gateway & Lambda に来た「JSONパラメータ」を
  // バリデーションかつ検索用オブジェクト化。
  const condition = new Condition();
  const errCode = condition.setAndValidation(event, condition); // FIXME 自分を引数にせなあかんとか…腐ってる
  if (errCode !== 0) {
    context.succeed({ result: errCode });
    return;
  }

  const models = require('./models/index');

  // ORM用の「WHERE条件オブジェクト」作り。
  const wheres = {};
  let condCount = 0;
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