const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { INTEGER } = DataTypes

const userExamHistoryMapping = sequelize.define('user_exam_history_mapping', {
    user_id: {
        type: INTEGER,
        allowNull: false
    },
    exam_history_id: {
        type: INTEGER,
        allowNull: false
    }
}, {
    schema: "quiz_app",
    timestamps: false,
    freezeTableName: true
})

module.exports = userExamHistoryMapping 