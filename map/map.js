const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../routes/helper');

router.get('/', isLoggedIn,(req,res,next) => {
    res.render('map.ejs');
 });






module.exports = router;

