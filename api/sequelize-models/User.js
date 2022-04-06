const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { STRING } = DataTypes

const user = sequelize.define('user', {
    email: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: STRING,
        allowNull: true
    },
    google_id: {
        type: STRING,
        allowNull: true
    },
    status: {
        type: STRING,
        allowNull: true,
        defaultValue: "pending"
    }
}, {
    schema: "quiz_app",
    timestamps: true,
    // freezeTableName: true,

    // indexes: [
    //     // Create a unique index on email
    //     {
    //         unique: true,
    //         fields: ['email']
    //     }]
})

module.exports = user 