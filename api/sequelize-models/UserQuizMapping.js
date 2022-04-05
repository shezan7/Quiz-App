const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { INTEGER } = DataTypes

const userOrderMapping = sequelize.define('user_quiz_mapping', {
    user_id: {
        type: INTEGER,
        allowNull: false
    },
    quiz_id: {
        type: INTEGER,
        allowNull: false
    }
}, {
    schema: "quiz_app",
    timestamps: false,
    freezeTableName: true
})

module.exports = userOrderMapping 