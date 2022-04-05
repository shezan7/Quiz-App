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




module.exports = router;