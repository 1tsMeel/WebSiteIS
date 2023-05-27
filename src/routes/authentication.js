const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');
const { isNotLoggedIn } = require('../lib/auth');

//Ruta con metodo get, para renderizar el formulario0
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

//Ruta con el metodo post, recibe los datos del formulario
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/login');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {

    res.render("profile")
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin')
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
});





module.exports = router;