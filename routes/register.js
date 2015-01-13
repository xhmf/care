var express = require('express'),
    router = express.Router(),
    redis = require('redis'),
    client = redis.createClient();

router.get('/', function(req, res) {
  if (req.session.user) {
    res.redirect('/');
  } else {
    res.render('form', { title: 'Register' });
  }
});

router.post('/', function(req, res, next) {
  var bodyUser = req.body.user;
  var bodyPass = req.body.pass;
  var errors = res.locals.errors = [];
  if (bodyUser && bodyPass) {
    // if fields filled out
    client.get('user:' + bodyUser, function(err, pass) {
      if (err) {
        return next(err);
      } else if (!pass) {
        client.set('user:' + bodyUser, bodyPass);
        req.session.user = bodyUser;
        res.redirect('/');
      } else {
        errors.push('Sorry that username is already taken');
        res.render('form', { title: 'Register' });
      }
    });
  } else {
    if (!bodyUser) {
      errors.push('Please do not leave username field blank');
    }
    if (!bodyPass) {
      errors.push('Please do not leave password field blank');
    }
    res.render('form', { title: 'Register' });
  }
});

module.exports = router;
