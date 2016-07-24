'use strict';
module.exports = function(sequelize, DataTypes) {
  var AwsProduct = sequelize.define('AwsProduct', {
    productName: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    miuraUse: DataTypes.BOOLEAN,
    defficultLevel: DataTypes.INTEGER,
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