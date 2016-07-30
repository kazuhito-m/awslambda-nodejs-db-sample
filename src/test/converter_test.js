'use strict';

const assert = require('power-assert');

const Converter = require('../main/converter');
const Condition = require('../main/condition');

/**
 * Converterクラスのテスト。
 */

describe('Converter', () => {

    const sut = new Converter();

    it('「価なし」という値系はすべてnullに押しなべることが出来る', () => {
        assert.equal(sut.nullize(undefined), null);
        assert.equal(sut.nullize(null), null);
    })

    it('送信値が「適切な型か」をチェック出来る', () => {
        const event = {};
        const cond = new Condition();

        // productNameが文字列以外なら
        event.productName = 0;
        assert.equal(sut.setAndValidation(event, cond), 101);

        event.productName = '文字列';
        assert.equal(sut.setAndValidation(event, cond), 0);

        // miuraUseが真偽値以外なら
        event.miuraUse = 123;
        assert.equal(sut.setAndValidation(event, cond), 102);

        event.miuraUse = true;
        assert.equal(sut.setAndValidation(event, cond), 0);
    });

});