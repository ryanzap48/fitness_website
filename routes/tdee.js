var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('tdee', { title: 'Hello' });
});

router.post('/', function(req, res, next) {
    const { gender, age, weight, height, activity } = req.body;
    res.send({ gender, age, weight, height, activity });
});

module.exports = router;
