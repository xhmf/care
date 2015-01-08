var express = require('express'),
    router = express.Router(),
    redis = require('redis'),
    client = redis.createClient();

router.get('/', function(req, res) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.render('form', { title: 'Login' });
    }
});

router.post('/', function(req, res, next) {
    var bodyUser = req.body.user;
    var bodyPass = req.body.pass;
    if (bodyUser && bodyPass) {
        // check if user in database
        client.get('user:' + bodyUser, function(err, pass) {
            if (err) return next(err);
            if (pass && pass === bodyPass) {
                 // user is valid
                 req.session.user = bodyUser;
                 res.redirect('/');
             } else {
                 res.locals.errors = [];
                 res.locals.errors.push('Incorrect username or password');
                 res.render('form', { title: 'Login' });
             }
        });
    } else { // one or both fields left blank
        var errors = res.locals.errors = [];
        if (!req.body.user) {
            errors.push('Please enter username');
        }
        if (!req.body.pass) {
            errors.push('Please enter password');
        }
        res.render('form', { title: 'Login' });
    }
});

module.exports = router;
