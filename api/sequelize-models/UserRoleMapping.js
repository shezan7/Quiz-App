const { DataTypes } = require('sequelize')

const sequelize = require('../config/db');

const { INTEGER } = DataTypes

const userRoleMapping = sequelize.define('user_role_mapping', {
    user_id: {
        type: INTEGER,
        allowNull: false
    },
    role_id: {
        type: INTEGER,
        allowNull: false
    }
}, {
    schema: "quiz_app",
    timestamps: false,
    freezeTableName: true
})

module.exports = userRoleMapping 