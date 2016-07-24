'use strict';

var Promise = require('bluebird');
var fs = require('fs');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise
            .resolve()
            .then(() => {
                return fs.readFileSync(__dirname + '/sql/import-initail-data.sql', 'utf-8');
            })
            .then((initialSchema) => {
                return queryInterface.sequelize.query(initialSchema);
            })
    },

    down: (queryInterface, Sequelize) => {
        return Promise
            .resolve()
            .then(() => {
                return fs.readFileSync(__dirname + '/sql/drop-initail-data.sql', 'utf-8');
            })
            .then((dropSql) => {
                return queryInterface.sequelize.query(dropSql);
            });
    }
};