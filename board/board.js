const express = require('express');
const {Post,User} = require('../models');
const router = express.Router();


// 게시글 작성
router.route('/write')
    .get((req,res) => {
        res.render('write.ejs');
    })
    .post(async(req,res,next) => {
        const { id,title,body,createdAt } = req.body;
        try {
            await Post.create({ id,title,body,createdAt });
            res.redirect('/board');
        }catch(err) {
            console.error(err);
            next(err);
        }
    });

// 게시글 보기
router.get('/:id',async (req,res,next) => {
    try {
        const post = await Post.findOne({
            where: { id:req.params.id },
            attributes:['id','title','body', 'createdAt'],
        });
        var Str = post.createdAt;
        var date = Str.toString().substring(0,25);
        res.locals.dates = date;
        res.render('show.ejs',{post:post});
    }catch(err) {
        console.error(err);
        next(err);
    }
})


// 게시글 편집(서버 전달)
router.get('/:id/edit',async(req,res,next) => {
    try {
        const post = await Post.findOne({
            id: req.body.id,
            title: req.body.title,
            body: req.body.body,
        }, {
            where: { id: req.params.id }
        });
        res.render('edit.ejs',{post:post});
    } catch(err) {
        console.error(err);
        next(err);
    }
});

// 게시글 편집 (서버에 전달된 정보를 DB에서 수정)
router.post('/:id',async(req,res,next) => {
    try {
        const post = await Post.update({
            id: req.body.id,
            title: req.body.title,
            body: req.body.body,
        }, {
            where: { id: req.params.id }
        });
        // res.render('edit.ejs',{post:post});
        if (post) res.redirect('/board');
        else next('Not updated!')
    } catch(err) {
        console.error(err);
        next(err);
    }
});


// 게시글 삭제
router.delete('/:id', async(req,res,next) => {
    try {    
    const post = await Post.destroy({
        where : { id:req.params.id},
        // attributes:['id','title','body', 'createdAt']
    });
    if(post) res.redirect('/board')
    else next ('삭제되지 않았습니다');
    } catch(err) {
        console.error(err);
        next(err);
    }
})


module.exports = router;