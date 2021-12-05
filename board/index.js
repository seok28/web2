const express = require('express');
const {isLoggedIn} = require('../routes/helper');
const {Post} = require('../models');
const router = express.Router();


router.get('/board', isLoggedIn,async(req,res,next) => {
    try {
    const posts = await Post.findAll({})
    res.render('board.ejs',{posts:posts});
  }catch(err) {
      console.error(err);
      next(err);
  }
});

module.exports = router;