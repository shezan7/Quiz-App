const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { INTEGER, STRING } = DataTypes

const access = sequelize.define('access', {
    name: {
        type: STRING,
        allowNull: false
    },
    module_id: {
        type: INTEGER,
        allowNull: false
    }
}, {
    schema: "quiz_app",
    timestamps: true,
    freezeTableName: true
})

module.exports = access 