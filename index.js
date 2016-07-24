exports.handler = (event, context) => {

  process.env.NODE_ENV = 'production';
  var models = require('./models/index');  

  models.AwsProduct.findAll({}).then(function(records) {
    var jsonByDb = JSON.stringify(records);
    context.succeed(jsonByDb) ;
  });

};