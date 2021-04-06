const express = require("express")
const router = new express.Router();


const { ok } = require('assert')
const { validate } = require('../model/user')
const checkAuth = require('../middleware/check-auth');
const UsersController = require('../controllers/user');


router.post('/api/register', UsersController.users_post_register);

router.post('/api/login', UsersController.users_post_login);

router.post('/api/profile',checkAuth, UsersController.users_post_checkAuth);

router.post('/api/change-password', UsersController.users_post_changePassword);


module.exports = router;