const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { INTEGER, STRING, JSON } = DataTypes

const exam_history = sequelize.define('exam_history', {
    quiz_name: {
        type: STRING,
        allowNull: false
    },
    total_question: {
        type: INTEGER,
        allowNull: false
    },
    time: {
        type: INTEGER,
        allowNull: false
    },
    marks: {
        type: INTEGER,
        allowNull: false
    },
    question: {
        type: JSON,
        allowNull: false
    },
    rank: {
        type: STRING
    }

}, {
    schema: "quiz_app",
    timestamps: true,
    freezeTableName: true
})

module.exports = exam_history 