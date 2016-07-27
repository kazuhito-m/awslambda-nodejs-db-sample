'use strict';

/**
 * API Gateway & Lambada からの送信値を、中間検索条件オブジェクトへと変換するクラス。
 */
function Converter() {

    /**
     * Conditionのインスタンスに、API Gateway & Lambda で飛んできた「eventオブジェクt」の値をセットする。
     * 出来ない場合、0以外の数値を返す。
     */
    this.setAndValidation = (event, cond) => {

        const productName = nullize(event.productName);
        if (!isTypeNullable('string', productName)) {
            return 101;
        }
        cond.productName = productName;

        const miuraUse = nullize(event.miuraUse);
        if (!isTypeNullable('boolean', miuraUse)) {
            return 102;
        }
        cond.miuraUse = miuraUse;

        return 0;
    }

    // ユティリティメソッド。

    /**
     * undifind や empty など「値なし」を表す値をすべてnullにおしなべる。
     */
    function nullize(value) {
        if (value === undefined) {
            return null;
        }
        return value;
    }

    /**
     * 指定したタイプに合致しているかのチェック。
     * (ただし、nullは許す)
     */
    function isTypeNullable(typeName, value) {
        return (value === null || typeof value === typeName);
    }

}

module.exports = Converter;