const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const { checkUser } = require("../middleware/roleValid")

const ExamHistoryController = require('../controllers/examHistory')


router.use(checkAuth)

router.get("/exam-history/view-all-quiz-details", checkUser(15), ExamHistoryController.view_AllQuizDetails);

router.get("/exam-history/view-quiz-details", checkUser(7), ExamHistoryController.view_quizDetails);

router.post("/exam-history/create-quiz-details", checkUser(16), ExamHistoryController.create_quizDetails);



module.exports = router;