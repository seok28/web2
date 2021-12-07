const express =require('express');
const router = express.Router();

let markerList =[];

router.get('/',(req,res,next) => {
    res.render('upload.ejs');
});

router.get('/post',(req,res,next) => {

});


module.exports = router;