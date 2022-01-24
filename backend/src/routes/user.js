const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../app/controllers/UserController');
require('../app/config/passport')

router.post('/add', userController.createUser);

router.post('/login', (req, res) => { 
    passport.authenticate('local', (error, user, info) => {
        if (error) return;

        if (!user) return res.status(401).send( info.message );

        req.session.user = user.data();
        return res.status(200).json({
            id: user.id,
            name: user.data().name
        });
    })(req, res);
});

router.post('/signup', userController.createUser)

router.get('/logout', (req, res) => {
    req.session.destroy((req, res) => {
        // return res.status(200);
    });
});

module.exports = router;
