const express = require('express');
const router = express.Router();

router.get('/map', (req,res,next) => {
    res.render('map.ejs');
 });

 router.get('/upload',(req,res,next) => {
    res.render('upload.ejs');
});

module.exports = router;