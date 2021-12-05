const express = require('express');
const router = express.Router();


router.get('/', function(req, res){
  res.render('index.ejs');
});
router.get('/about', function(req, res){
  res.render('about.ejs');
});

module.exports = router;