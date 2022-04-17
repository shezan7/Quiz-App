const db = require('../config/db')
const { QueryTypes } = require('sequelize')

const sequelizeQuiz = require('../sequelize-models/Quiz')
const sequelizeUserQuizMapping = require('../sequelize-models/UserQuizMapping')



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
        const { quiz_name, total_question, questionlist, time, marks } = req.body;

        const newQuiz = await sequelizeQuiz.create({
            quiz_name,
            total_question,
            questionlist,
            time,
            marks
        })
        // console.log(newQuiz)
        // console.log("newQuizID", newQuiz.id)

        const userQuiz = await sequelizeUserQuizMapping.create({
            user_id: req.user.id,
            quiz_id: newQuiz.id
        })

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

