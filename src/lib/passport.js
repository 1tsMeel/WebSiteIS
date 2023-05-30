const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'Contraseña',
    passReqToCallback: true
}, async (req, username, Contraseña, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(Contraseña, user.Contraseña);
        if (validPassword) {
            done(null, user, req.flash('success', 'Welcome ' + user.username))

        } else {
            done(null, false, req.flash('message', 'Contraseña Incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'El Usuario no existe'));
    }
}));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'Contraseña',
    passReqToCallback: true
}, async (req, username, Contraseña, done) => {
    console.log(req.body)
    const { Nombre } = req.body;
    const { Cargo } = req.body;
    const { Correo } = req.body;
    const { apellidoP } = req.body;
    const { apellidoM } = req.body;
    /*const newUser = {
        username,
        password,
        fullname,
        apellido1,
        apellido2,
        cargo,
        correo
    };*/
    const newUser = {
        Nombre,
        apellidoP,
        apellidoM,
        Correo,
        Contraseña,
        username,
        Cargo,
    };
    newUser.Contraseña = await helpers.encryptPassword(Contraseña);
    const result = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
    newUser.Id_Usuario = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.Id_Usuario);
});

passport.deserializeUser(async (Id_Usuario, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE Id_Usuario = ?', [Id_Usuario]);
    done(null, rows[0]);
});