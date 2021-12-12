const express = require('express');
const authControllers = require('../controllers/authControllers');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.post('/login', authControllers.postLogin);
router.post('/logout', isAuth.isAuth, authControllers.postLogout);

module.exports = router;
