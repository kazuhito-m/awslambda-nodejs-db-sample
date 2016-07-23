'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'aws_product',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        product_name: Sequelize.STRING,
        release_date: {
          type: Sequelize.DATE
        },
        miura_use: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },
        defficult_level: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
          allowNull: false
        },
        description: Sequelize.STRING
      }
    );
  },
  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('aws_product');
  }
};
