'use strict';

var Promise = require('bluebird');
var fs = require('fs');

module.exports = {
    up: function (queryInterface, Sequelize) {

        return Promise
            .resolve()
            .then(function() {
                return fs.readFileSync(__dirname + '/sql/import-initail-data.sql', 'utf-8');
            })
            .then(function (initialSchema) {
                return queryInterface.sequelize.query(initialSchema);
            })
    },

    down: function (queryInterface, Sequelize) {
        return Promise
            .resolve()
            .then(function() {
                return fs.readFileSync(__dirname + '/sql/drop-initail-data.sql', 'utf-8');
            })
            .then(function (dropSql) {
                return queryInterface.sequelize.query(dropSql);
            });
    }
};