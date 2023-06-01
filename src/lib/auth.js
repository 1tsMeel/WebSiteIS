module.exports = {
    //Verificar si esta logeado el usuario
    isLoggedIn(req, res, next) {
        console.log(req.user)
        if (req.isAuthenticated()) {
            return next();
        }

        return res.redirect('/signin')
    },
    //Verificar si no esta logeado el usuario
    isNotLoggedIn(req, res, next) {
        console.log(req.user)
        if (!req.isAuthenticated()) {
            return next();
        }

        return res.redirect('/profile')
    },
    //Verificar si es administrador
    async isAdmin(req, res, next) {
        if (req.user.Cargo === "administrador") {
            return next();
        }
        return res.redirect('/profile')
    }
}