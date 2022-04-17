const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const { checkUser } = require("../middleware/roleValid")

const QuizController = require('../controllers/quiz')


router.use(checkAuth);

router.get("/quiz/view-allQuizlist", checkUser(5), QuizController.view_AllQuizlist);

router.get("/quiz/view-quizlist", checkUser(4), QuizController.view_quizlist);

router.post("/quiz/create-quiz", checkUser(6), QuizController.create_quiz);



module.exports = router;