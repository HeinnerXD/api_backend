'use strict'

const router = require('express').Router();
const user_controller = require('../controllers/user');
const passportConfig = require('../config/passport');


router.post('/signup', user_controller.postSigup);
router.post('/login', user_controller.postLogin);


router.get('/logout', passportConfig.estaAutenticado, user_controller.logout);

router.get('/usuarioInfo', passportConfig.estaAutenticado, (req, res) => {
    res.json(req.user);
})

module.exports = router;