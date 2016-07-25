'use strict';

const assert = require('power-assert');
const Condition = require('../main/condition');

/**
 * 検索条件VOクラスのテスト。
 * 
 * 責務的には「VOなので少量の処理しかない」が、JSのプロパティ形式が不安なので、確認用。
 * 疑問を解決し経験を積むため、なるだけ冗長でもいいから丁寧にテスト書く。
 */

describe('Condition', () => {

	it('プロパティ確認、初期値はnullで統一', () => {
		const sut = new Condition();
		assert.equal(sut.productName, null);
		assert.equal(sut.miuraUse, null);
	});

});