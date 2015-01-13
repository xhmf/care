var router = require('express').Router();

router.post('/', function(req, res) {
  if (req.session.user) {
    delete req.session.user;
    var errors = res.locals.errors = [];
    errors.push('You are now logged off.');
    res.render('form', { title: 'Login' });
  }
});

module.exports = router;
