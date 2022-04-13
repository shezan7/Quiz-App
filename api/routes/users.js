const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth');
const { checkUser } = require("../middleware/roleValid")

const UsersController = require('../controllers/users');


router.post("/users/signup", UsersController.users_signup);

router.get("/users/pending-users", checkAuth, checkUser(1), UsersController.users_get_pending);

router.get("/users/approve/:id", checkAuth, checkUser(2), UsersController.users_update_approve);

router.get("/users/reject/:id", checkAuth, checkUser(3), UsersController.users_update_reject);

router.get("/users/approved-users", checkAuth, checkUser(1), UsersController.users_get_approve);

router.get("/users/rejected-users", checkAuth, checkUser(1), UsersController.users_get_reject);

router.post("/users/login", UsersController.users_login);

// router.patch("/users/make-tutor", checkAuth, checkUser(13), UsersController.make_tutor);


module.exports = router;