'use strict';

const assert = require('power-assert');

/**
 * AWS Lambda の本体関数のテスト。
 */

describe('lambda.handler', () => {

    // TODO 「DBテスト」の方法がわからない限り実装しない

    it('Lambdaに届いた時に入力が変なら"code"に0以外が返る', function() {
        // 事前条件
        const event = {
            productName: 0,
            miuraUsr: 0
        };

        // 実行 & 検証
        const context = {
            succeed: (result) => {
                // コールバックが終点なので、そこで検証する。
                assert.notEqual(result.code, 0, 'エラー時はcodeが0以外');
                assert.equal(result.data, undefined, 'エラー時はデータが空っぽ');
            }
        };

        const lambda = require('../main/index');
        lambda.handler(event, context);
    });

});