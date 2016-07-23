'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'aws_product',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        product_name: DataTypes.STRING,
        release_date: {
          type: DataTypes.DATE
        },
        using: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },
        defficult_level: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
          allowNull: false
        },
        description: DataTypes.STRING
      }
    );
  },
  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('aws_product');
  }
};
