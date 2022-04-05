const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { STRING } = DataTypes

const module = sequelize.define('module', {
    module_name: {
        type: STRING,
        allowNull: false
    }
}, {
    schema: "quiz_app",
    timestamps: true,
    freezeTableName: true
})

module.exports = module 