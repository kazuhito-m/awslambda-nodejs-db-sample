'use strict';

/**
 * このシステムのDaoクラス。
 * テンプレ想定だし、対象が曖昧なので特定物の、ではなくXXXとしている。
 * (使う時置き換えるように)
 */
function XxxDao() {

    // 初期化済み Sequelize のオブジェクト群を読み込み・生成する。
    process.env.NODE_ENV = 'production'; // 外部化してないので、無理にここに書いておく。
    this.models = require('./models/index');

    /**
     * Conditionのインスタンスに、API Gateway & Lambda で飛んできた「eventオブジェクt」の値をセットする。
     * 出来ない場合、0以外の数値を返す。
     */
    this.findAwsProduct = (condition, callback) => {
        // ORM用の「WHERE条件オブジェクト」作り。
        const findSettings = makeFindSettings(condition);
        // 検索を実行し、結果のオブジェクトをコールバックに返す
        this.models.AwsProduct.findAll(findSettings).then((records) => {
            callback(records);
        });
    }

    // private関数

    /**
     * 中間オブジェクトであるConditionオブジェクトを、
     * ORM(Sequelize)のfindAll()用の設定オブジェクトへと変換する。
     */
    function makeFindSettings(condition) {
        // Conditionオブエジェクト -> ORM(Sequelize)のWhere条件に変換。
        const wheres = {};
        if (condition.productName !== null) {
            wheres.productName = {
                $iLike: '%' + condition.productName + '%'
            };
        }
        if (condition.miuraUse !== null) {
            wheres.miuraUse = condition.miuraUse;
        }
        // Where条件を含むfindAll()用の設定オブジェクトにくるむ。
        const result = {};
        if (Object.keys(wheres).length > 0) {
            result.where = wheres;
        }
        return result;
    }

}

module.exports = XxxDao;