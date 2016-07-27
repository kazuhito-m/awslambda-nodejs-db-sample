'use strict';

const Condition = require('./condition');
const Converter = require('./converter');
const XxxDao = require('./xxxdao');

function makeResutl(code, data) {
    const result = {};
    result.code = code;
    if (data !== null) {
        result.data = data;
    }
    return result;
}

exports.handler = (event, context) => {

    // API Gateway & Lambda に来た「JSONパラメータ」を
    // バリデーションかつ検索用オブジェクト化。
    const converter = new Converter();
    const condition = new Condition();
    const errCode = converter.setAndValidation(event, condition);
    if (errCode !== 0) {
        context.succeed(makeResutl(errCode));
        return;
    }

    // ORM用をラップしたDaoを作り検索を実行、結果のオブジェクトをレスポンスとして返す。
    const dao = new XxxDao();
    dao.findAwsProduct(condition, (records) => {
        context.succeed(makeResutl(0, records));
    });
    
};