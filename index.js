console.log('イベントが読みこまれましたし。');	

exports.handler = function (event, context) {
  context.succeed('こんにちは世界！…というふうに日本語を返したい！！');
};