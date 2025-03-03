var express = require('express');
var router = express.Router();

const activityMultipliers = {
    "sedentary": 1.2,
    "light": 1.375,  
    "moderate": 1.55,      
    "active": 1.725,      
    "very_active": 1.9 
}

router.get('/', function(req, res, next) {
  res.render('tdee', { title: 'Hello' });
});

router.post('/', function(req, res, next) {
    var { unit, gender, age, weight, height, activity } = req.body;
    
    var bmr, tdee ;

    if (unit == 'imperial') {
      weight *= 0.453592
      height *= 2.54
    }

    if (gender == 'female') bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161
    else bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5

    tdee = bmr * (activityMultipliers[activity]);

    res.render('tdee-result', { tdee: tdee.toFixed(0)});
});

module.exports = router;
