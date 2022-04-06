const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth');
const { checkUser } = require("./../middleware/roleValid")

const UsersController = require('../controllers/users');


router.post("/users/signup", UsersController.users_signup);

router.get("/users/pending-users", UsersController.users_get_pending);

router.patch("/users/approve/:id", UsersController.users_update_approve);

router.patch("/users/reject/:id", UsersController.users_update_reject);

router.get("/users/approved-users", UsersController.users_get_approve);

router.get("/users/rejected-users", UsersController.users_get_reject);

router.post("/users/login", UsersController.users_login);

router.patch("/users/make-tutor", checkAuth, checkUser(13), UsersController.make_tutor);


module.exports = router;