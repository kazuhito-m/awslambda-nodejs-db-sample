'use strict';
process.env.NODE_ENV = 'production';  // 外部化してないので、無理にここに書いておく。
const Condition = require('./condition');

exports.handler = (event, context) => {

  // API Gateway & Lambda に来た「JSONパラメータ」を
  // バリデーションかつ検索用オブジェクト化。
  const condition = new Condition();
  const errCode = condition.setAndValidation(event);
  if (errCode !== 0) {
    context.succeed({ result: errCode });
    return;
  }

  const models = require('./models/index');

  models.AwsProduct.findAll({}).then((records) => {
    context.succeed(JSON.stringify(records));
  });

};