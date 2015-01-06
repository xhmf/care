var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    if (req.session.user) {
        res.end(req.session.user);
    } else {
        res.render('login');
    }
});

router.post('/', function(req, res) {
    if (req.body.user && req.body.pass) {
        req.session.user = req.body.user;
        res.redirect('/login');
    } else {
        res.locals.loginErrors = [];
        if (!req.body.user) {
            res.locals.loginErrors.push('Please enter username');
        }
        if (!req.body.pass) {
            res.locals.loginErrors.push('Please enter password');
        }
        console.log(res.locals.loginErrors);
        res.render('login');
    }
});

module.exports = router;
