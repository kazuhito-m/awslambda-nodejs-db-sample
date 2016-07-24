'use strict';

const Condition = require('./condition');
const Converter = require('./converter');
const XxxDao = require('./xxxdao');

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

  // ORM用をラップしたDaoを作り検索を実行、結果のオブジェクトをレスポンスとして返す。
  const dao = new XxxDao();
  dao.findAwsProduct(condition, (records) => {
    context.succeed({ result: 0, data: records });
  });

};