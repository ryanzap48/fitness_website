require("dotenv").config();
var express = require('express');
var axios = require("axios");
var router = express.Router();

var USDA_API_KEY = process.env.USDA_API_KEY;
var USDA_BASE_URL = "https://api.nal.usda.gov/fdc/v1";

router.get('/', (req, res) => {
    res.render('food-index');
  });


router.get('/search', async (req, res) => {
  const query = req.query.q;
  
  const response = await axios.get(`${USDA_BASE_URL}/foods/search`, {
    params: {
      query: query,
      api_key: USDA_API_KEY
    }
  });

  const foods = response.data.foods.slice(0, 20);

  res.render('results', { foods: foods, query: query });
});

router.get("/nutrition/:fdcId", async (req, res) => {
  const fdcId = req.params.fdcId;

  const response = await axios.get(`${USDA_BASE_URL}/food/${fdcId}`, {
      params: { 
        api_key: USDA_API_KEY 
      }
  });

  const food = response.data;
  
  res.render('foodDetail', { food: food });
});

module.exports = router;