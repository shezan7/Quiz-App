const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = require('../config/db')
const { QueryTypes } = require('sequelize')

const sequelizeUser = require('../sequelize-models/User')
const urm = require('../sequelize-models/UserRoleMapping')


exports.users_signup = async (req, res, next) => {
    console.log("users_register", req.body);
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    hashPassword = await bcrypt.hash(password, salt);
    try {
        const newUser = await sequelizeUser.create({
            email: email,
            password: hashPassword
        })
        // console.log("new", newUser)
        if (newUser) {
            try {
                console.log("user's status", newUser.status)
                const setUserRole = await urm.create({
                    user_id: newUser.id,
                    role_id: 2
                })
            } catch (error) {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            }
        }

        if (!newUser) {
            const error = new Error('User not created!');
            error.status = 500;
            throw error;
        }
        console.log(newUser);
        res.status(200).json({
            data: "User registered successfully", newUser
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.users_get_pending = async (req, res, next) => {
    try {
        const userAll = await sequelizeUser.findAll({
            attributes: ['email', 'status'],

            where: {
                status: "pending"
            }
        })
        console.log("Pending Users", userAll);

        res.json({
            message: userAll
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.users_update_approve = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userAll = await sequelizeUser.update({
            status: "approve"
        }, {
            where: {
                id
            }
        })
        console.log("Updated status", userAll);

        res.json({
            message: "Approved successfully", userAll
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.users_update_reject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userAll = await sequelizeUser.update({
            status: "reject"
        }, {
            where: {
                id
            }
        })
        console.log("Updated status", userAll);

        res.json({
            message: "Rejected successfully", userAll
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.users_get_approve = async (req, res, next) => {
    try {
        const userAll = await sequelizeUser.findAll({
            attributes: ['email', 'status'],

            where: {
                status: "approve"
            }
        })
        console.log("Approved Users", userAll);

        res.json({
            message: userAll
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.users_get_reject = async (req, res, next) => {
    try {
        const userAll = await sequelizeUser.findAll({
            attributes: ['email', 'status'],

            where: {
                status: "reject"
            }
        })
        console.log("Rejected Users", userAll);

        res.json({
            message: userAll
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}



exports.users_login = async (req, res, next) => {

    console.log("users_login", req.body);

    const { email, password } = req.body;

    try {

        const user = await db.query(
            `SELECT 
                u.*,
                (SELECT 
                    r.accesslist 
                FROM 
                    shezan.user_role_mapping urm, 
                    shezan.roles r 
                WHERE 
                    u.id = urm.user_id  
                    AND urm.role_id = r.id)
            FROM 
                shezan.users u
            WHERE 
                u.email= '${email}';`
            , {
                type: QueryTypes.SELECT
            })

        if (!user[0]) {
            return res.status(404).send({ message: "User Not found." });
        }
        if (user[0]) {
            const validPassword = await bcrypt.compare(password, user[0].password)

            if (validPassword) {
                const jwtToken = jwt.sign({
                    id: user[0].id,
                    access: user[0].accesslist
                }, process.env.JWT_KEY,
                    {
                        expiresIn: "8h"
                    })

                res.status(200).json({
                    data: "User login successfull",
                    token: jwtToken,
                    userId: user[0].id
                })
                console.log(user[0].id)
            }
            else {
                return res.status(401).send({
                    message: "Invalid Password!"
                });
            }
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.make_tutor = async (req, res, next) => {
    console.log("users_info", req.body);

    const { user_id } = req.body
    try {

        const user = await urm.findOne({
            where: {
                user_id
            }
        })
        //console.log("first", user.role_id)
        if (!user) {
            return res.status(404).send({ message: "No user found for making tutor" });
        }
        else if (user.role_id === 2) {
            return res.status(404).send({ message: "Already tutor" });
        }
        else {
            const editorRole = await urm.update({
                role_id: 2
            }, {
                where: {
                    user_id
                }
            })

            res.status(200).json({
                message: "Make admin successfull"
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}
