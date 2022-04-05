const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { STRING } = DataTypes

const quiz = sequelize.define('quiz', {
    question: {
        type: STRING,
        allowNull: false
    },
    options: {
        type: STRING
    },
    answer: {
        type: STRING,
        allowNull: false
    }
}, {
    schema: "quiz_app",
    timestamps: true,
    freezeTableName: true
})

module.exports = quiz 