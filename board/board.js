const express = require('express');
const {Post,User} = require('../models');
const router = express.Router();


// 게시글 작성
router.route('/write')
    .get((req,res) => {
        res.render('write.ejs');
    })
    .post(async(req,res,next) => {
        const { title,body,createdAt } = req.body;
        try {
            await Post.create({ title,body,createdAt });
            res.redirect('/board');
        }catch(err) {
            console.error(err);
            next(err);
        }
    });

// 게시글 편집 
router.post('/edit',async(req,res,next) => {
    try {
        const result = await User.update({
            title: req.body.title,
            body: req.body.body
        },{
            where: {id: req.body.id }
        });

        if(result) res.redirect('/board');
        else next('Not updated');
    } catch(err) {
        console.error(err);
        next(err);
    }
});

// 게시글 삭제




module.exports = router;