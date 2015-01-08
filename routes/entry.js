var express = require('express'),
    router = express.Router(),
    Entry = require('../lib/entry'),
    client = require('redis').createClient();

router.post('/', function(req, res, next) {
    var miles = parseFloat(req.body.miles);
    var gas = parseFloat(req.body.gas);
    // check if both are valid decimals
    if (!isNaN(miles) && !isNaN(gas)) {
        var current = new Entry({
            miles: miles,
            gas: gas,
            mpg: miles/gas
        });
        console.log('here');
        current.save(req.session.user, function(err) {
            if (err) return next(err);
            res.redirect('/');
        });        
    } else {
        var errors = res.locals.errors = [];
        if (isNaN(miles)) {
            errors.push('Invalid distance field');
        }
        if (isNaN(gas)) {
            errors.push('Invalid gas field');
        }
        req.session.errors = errors;
        res.redirect('/');
    }
});

module.exports = router;
