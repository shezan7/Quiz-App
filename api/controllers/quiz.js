const db = require('../config/db')
const { QueryTypes } = require('sequelize')

const sequelizeQuiz = require('../sequelize-models/Quiz')
const sequelizeUserQuizMapping = require('../sequelize-models/UserQuizMapping');
const sequelizeExamHistory = require('../sequelize-models/ExamHistory')


exports.quiz_get_all = async (req, res, next) => {
    console.log("orders_get", req.body);

    console.log("one", req.user.id);

    //const current_user_id = req.user.id

    const userOrders = [];
    const findUserId = await sequelizeUserOrderMapping.findAll({
        where: {
            user_id: req.user.id,
        },
        attributes: ["order_id"]
    })
    // console.log("find", findUserId.user_order_mapping)
    findUserId.map((val) => {
        // console.log('Value', val.order_id);
        userOrders.push(val.order_id)
    })
    console.log("list", userOrders);

    // console.log("id", req.params.id)
    // console.log("type", typeof (req.params.id))
    // console.log("type", typeof parseInt(req.params.id))


    try {
        // if (userOrders) {
        //     console.log("two")
        //     const order = await sequelizeOrder.findAll({
        //         attributes: ['product_id', 'quantity'],
        //         where: {
        //             id: userOrders
        //         }
        //     })

        console.log(req.user.id)
        if (userOrders) {
            const order = await db.query(
                `SELECT
                o.product_id,
                o.quantity,
                p.price,
                (p.price * o.quantity) AS total_price
                FROM
                    shezan.products p,
                    shezan.orders o,
                    shezan.user_order_mapping uom
                WHERE
                    p.id = o.product_id
                    AND o.id = uom.order_id
                    AND uom.user_id = ${req.user.id};`
                , {
                    type: QueryTypes.SELECT
                })

            res.json({
                message: "Find successfully", order
            })

        } else {
            console.log("three")
            return res.status(404).send({ message: "Not found!!!" });
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
};

exports.quiz_get = async (req, res, next) => {
    console.log("orders_get", req.body);

    // console.log("one", req.user.id);

    const current_user_id = req.user.id
    console.log(current_user_id)


    const userOrders = [];
    const findUserId = await sequelizeUserOrderMapping.findAll({
        where: {
            user_id: current_user_id,
        },
        attributes: ["order_id"]
    })
    // console.log("find", findUserId.user_order_mapping)
    findUserId.map((val) => {
        // console.log('Value', val.order_id);
        userOrders.push(val.order_id)
    })
    console.log("list", userOrders);

    // console.log("id", req.params.id)
    // console.log("type", typeof (req.params.id))
    // console.log("type", typeof parseInt(req.params.id))


    try {
        if (userOrders.includes(parseInt(req.params.id))) {
            console.log("two")
            // const { id } = req.params;
            // const order = await sequelizeOrder.findOne({
            //     attributes: ['product_id', 'quantity'],
            //     where: {
            //         id
            //     }
            // })

            const { id } = req.params;

            const order = await db.query(
                `SELECT
                o.product_id,
                o.quantity,
                p.price,
                (p.price * o.quantity) AS total_price
                FROM
                    shezan.products p,
                    shezan.orders o
                WHERE
                    p.id = o.product_id
                    AND o.id = ${id};`
                , {
                    type: QueryTypes.SELECT
                })

            res.json({
                message: "Find successfully", order
            })

        } else {
            console.log("three")
            return res.status(404).send({ message: "Not found!!!" });
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
};

exports.quiz_create = async (req, res, next) => {

    console.log("orders_create", req.body);
    // console.log("two", req.user);
    console.log("three", req.user.id);

    const user_id = req.user.id

    try {
        const { product_id, quantity } = req.body;

        const newOrder = await sequelizeOrder.create({
            product_id,
            quantity
        })
        // console.log(newOrder)
        console.log("newOrderID", newOrder.id)

        const orderItem = await sequelizeUserOrderMapping.create({
            user_id,
            order_id: newOrder.id
        })

        res.json({
            data: "New Order created successfully"
            //newOrder
        })

        if (!newOrder) {
            const error = new Error('Order not created!');
            error.status = 500;
            throw error;
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }

};

exports.view_AllQuizlist = async (req, res, next) => {
    try {
        console.log("All Quizlist", req.body);
        const quizAll = await sequelizeQuiz.findAll({
            attributes: ['id', 'quiz_name', 'total_question', 'time', 'marks', 'questionlist']
        })
        console.log("quizlist", quizAll);

        // const test = await sequelize.query(`
        // select * 
        // from quiz_app.quiz
        // `)

        // console.log('tes', test);

        res.json({
            data: quizAll
            // data: test[0]
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }

}

exports.view_quizlist = async (req, res, next) => {

    console.log("one", req.user.id);

    const userQuizlist = [];
    const findUserId = await sequelizeUserQuizMapping.findAll({
        where: {
            user_id: req.user.id,
        },
        attributes: ["quiz_id"]
    })
    findUserId.map((val) => {
        userQuizlist.push(val.quiz_id)
    })
    console.log("list", userQuizlist);

    try {
        if (userQuizlist === undefined || userQuizlist.length === 0) {
            console.log("two")
            return res.status(404).send({ message: "Quiz is not found!!!" });

        } else {
            const quiz = await db.query(
                `SELECT
                    q.id,
                    q.quiz_name,
                    q.total_question,
                    q.marks,
                    q.time,
                    q.questionlist
                FROM
                    quiz_app.users u,
                    quiz_app.quiz q,
                    quiz_app.user_quiz_mapping uqm
                WHERE
                    u.id = uqm.user_id
                    AND q.id = uqm.quiz_id
                    AND u.id = ${req.user.id};`
                , {
                    type: QueryTypes.SELECT
                })

            res.json({
                message: "Find successfully", quiz
            })
        }

    }

    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.create_quiz = async (req, res, next) => {
    console.log("quiz_create", req.body);
    // console.log("two", req.user);
    // console.log("three", req.user.id);

    // const user_id = req.user.id

    try {
        const { quiz_name, total_question, questionlist, time, marks, rank } = req.body;

        const newQuiz = await sequelizeQuiz.create({
            quiz_name,
            total_question,
            questionlist,
            time,
            marks
        })
        // console.log(newQuiz)
        // console.log("newQuizID", newQuiz.id)

        // const orderItem = await sequelizeUserOrderMapping.create({
        //     user_id,
        //     order_id: newQuiz.id
        // })

        res.json({
            data: "New Quiz created successfully",
            newQuiz
        })

        if (!newQuiz) {
            const error = new Error('Quiz not created!');
            error.status = 500;
            throw error;
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}





exports.view_AllQuizDetails = async (req, res, next) => {
    try {
        console.log("All Quiz Details", req.body);
        const quizDetailsAll = await sequelizeExamHistory.findAll({
            attributes: ['id', 'quiz_name', 'total_question', 'time', 'marks', 'question', 'rank']
        })
        console.log("quizDetails", quizDetailsAll);

        // const test = await sequelize.query(`
        // select * 
        // from quiz_app.quiz
        // `)

        // console.log('tes', test);

        res.json({
            data: quizDetailsAll
            // data: test[0]
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }

}

exports.view_quizDetails = async (req, res, next) => {

    console.log("one", req.user.id);

    const userQuizlist = [];
    const findUserId = await sequelizeUserQuizMapping.findAll({
        where: {
            user_id: req.user.id,
        },
        attributes: ["quiz_id"]
    })
    findUserId.map((val) => {
        userQuizlist.push(val.quiz_id)
    })
    console.log("list", userQuizlist);

    try {
        if (userQuizlist === undefined || userQuizlist.length === 0) {
            console.log("two")
            return res.status(404).send({ message: "Quiz is not found!!!" });

        } else {
            const quiz = await db.query(
                `SELECT
                    q.id,
                    q.quiz_name,
                    q.total_question,
                    q.marks,
                    q.time,
                    q.questionlist
                FROM
                    quiz_app.users u,
                    quiz_app.quiz q,
                    quiz_app.user_quiz_mapping uqm
                WHERE
                    u.id = uqm.user_id
                    AND q.id = uqm.quiz_id
                    AND u.id = ${req.user.id};`
                , {
                    type: QueryTypes.SELECT
                })

            res.json({
                message: "Find successfully", quiz
            })
        }

    }

    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

exports.create_quizDetails = async (req, res, next) => {
    console.log("quiz_create_details", req.body);
    // console.log("two", req.user);
    // console.log("three", req.user.id);

    // const user_id = req.user.id

    try {
        const { quiz_name, total_question, time, marks, question, rank } = req.body;

        const newQuizDetails = await sequelizeExamHistory.create({
            quiz_name,
            total_question,
            time,
            marks,
            question,
            rank
        })
        // console.log(newQuiz)
        // console.log("newQuizID", newQuiz.id)

        // const orderItem = await sequelizeUserOrderMapping.create({
        //     user_id,
        //     order_id: newQuiz.id
        // })

        res.json({
            data: "New Quiz_Details created successfully",
            newQuizDetails
        })

        if (!newQuizDetails) {
            const error = new Error('Quiz_Details is not created!');
            error.status = 500;
            throw error;
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}