const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const QuizController = require('../controllers/quiz');

const { checkUser } = require("../middleware/roleValid")


router.use(checkAuth);

router.get("/", checkUser(9), QuizController.quiz_get_all);

// router.get("/:id", checkUser(9), QuizController.quiz_get);

router.post("/quiz/create", checkUser(10), QuizController.quiz_create);

router.get("/quiz/viewAllQuizDetails", checkUser(), QuizController.quiz_get_all);

router.get("/quiz/viewQuizDetails", checkUser(), QuizController.quiz_get_all);

router.get("/quiz/viewQuizList", checkUser(), QuizController.quiz_get_all);

router.get("/users/view-allQuizlist", checkUser(5), QuizController.view_AllQuizlist);

router.get("/users/view-quizlist", checkUser(4), QuizController.view_quizlist);

router.post("/users/create-quiz", checkUser(6), QuizController.create_quiz);




router.get("/users/view-allQuiz-details", QuizController.view_AllQuizDetails);

router.get("/users/view-quiz-details", QuizController.view_quizDetails);

router.post("/users/create-quiz-details", QuizController.create_quizDetails);





module.exports = router;