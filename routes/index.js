var express = require('express');
var router = express.Router();
var Entry = require('../lib/entry');
var redis = require('redis'),
    client = redis.createClient();

/* GET home page. */
router.get('/', function(req, res, next) {
    var user = req.session.user;
    if (user) {
        res.locals.user = user; // allows access in template
        client.lrange(user + ':entries', 0, -1, function(err, entries) {
            if (err) return next(err);
            var clearEntries = [];
            entries.forEach(function(entry) {
                clearEntries.push(JSON.parse(entry));
            });
            console.log(clearEntries);
            res.render('index', {
                title: 'CARe Homepage',
                entries: clearEntries,
                errors: req.session.errors
            }); 
            delete req.session.errors;
        });
    } else {
        res.redirect('login');
    }
});

module.exports = router;
