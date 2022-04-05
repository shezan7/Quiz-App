const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth');
const { checkUser } = require("./../middleware/roleValid")

const UsersController = require('../controllers/users');


router.post("/users/signup", UsersController.users_signup);

router.post("/users/login", UsersController.users_login);

router.patch("/users/make-tutor", checkAuth, checkUser(13), UsersController.make_tutor);


module.exports = router;