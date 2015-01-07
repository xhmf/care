var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    if (req.session.user) {
        res.locals.user = req.session.user; // allows access in template
        res.render('index', { title: 'CARe Homepage' });
    } else {
        res.redirect('login');
    }
});

module.exports = router;
