const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { INTEGER, STRING, JSON } = DataTypes

const quiz = sequelize.define('quiz', {
    quiz_name: {
        type: STRING
    },
    total_question: {
        type: INTEGER
    },
    questionlist: {
        type: JSON,
        allowNull: false
    },
    time: {
        type: INTEGER
    },
    marks: {
        type: INTEGER
    },
    rank: {
        type: STRING
    }
}, {
    schema: "quiz_app",
    timestamps: true,
    freezeTableName: true
})

module.exports = quiz 