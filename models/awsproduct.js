'use strict';
module.exports = function(sequelize, DataTypes) {
  var AwsProduct = sequelize.define('aws_product', {
    id: DataTypes.NUMBER,
    product_name: DataTypes.STRING,
    release_date: DataTypes.DATE,
    miura_use: DataTypes.BOOLEAN,
    defficult_level: DataTypes.NUMBER,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return AwsProduct;
};
