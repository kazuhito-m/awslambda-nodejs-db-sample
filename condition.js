'use strict';
/**
 * 検索条件VOクラス。
 */
function Condition() {
	const values = {};	// 内部プロパティ変数を貯める場所。
	Object.defineProperty(this, 'productName', makeAccesserProductName(values));
	Object.defineProperty(this, 'miuraUse', makeAccesserMiuraUse(values));
}

/**
 * Conditionのインスタンスに、API Gateway & Lambda で飛んできた「eventオブジェクt」の値をセットする。
 * 出来ない場合、0以外の数値を返す。
 */
Condition.prototype.setAndValidation = (event) => {

	const productName = nullize(event.productName);
	if (isTypeNullable('string', productName)) {
		return 101;
	}
	this.productName = productName;

	const miuraUse = nullize(event.miuraUse);
	if (isTypeNullable('boolean', productName)) {
		return 102;
	}
	this.miuraUse = miuraUse;

	return 0;
}

function makeAccesserProductName(values) {
	return {
		enumerable: true,
		set: function (value) {
			values.productName = value;
		},
		get: function () {
			return values.productName;
		}
	};
}

function makeAccesserMiuraUse(values) {
	return {
		enumerable: true,
		set: function (value) {
			if (value == null || typeof value === 'boolean') {
				values.miuraUse = value;
			} else {
				throw new TypeError('101');
			}
		},
		get: function () {
			return values.miuraUse;
		}
	};

}

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

module.exports = Condition;
