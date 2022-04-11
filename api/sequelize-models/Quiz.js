const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { JSON } = DataTypes

const quiz = sequelize.define('quiz', {
    questionlist: {
        type: JSON,
        allowNull: false
    },
    // options: {
    //     type: STRING
    // },
    // answer: {
    //     type: STRING,
    //     allowNull: false
    // }
}, {
    schema: "quiz_app",
    timestamps: true,
    freezeTableName: true
})

module.exports = quiz 