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
    // get all entries for current user
    client.lrange(user + ':entries', 0, -1, function(err, entries) {
      if (err) return next(err);
      var clearEntries = []; // parse the JSON into object
      entries.forEach(function(entry) {
        clearEntries.push(JSON.parse(entry));
      });
      res.render('index', {
        title: 'CARe Homepage',
        entries: clearEntries,
        errors: req.session.errors
      }); 
      delete req.session.errors; // errors passed through redirect
    });
  } else {
    res.redirect('login');
  }
});

module.exports = router;
