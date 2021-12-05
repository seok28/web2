const express = require('express');
const passport = require('passport')
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

// 회원가입
router.get('/signup',(req, res)=>{
    res.render('signup.ejs');
});

router.route('/signup')
    .get(async(req,res,next) => {
    try {
        const users = await User.findAll({
            attributes : ['id']
        });
        res.render('signup');
    }catch(err) {
        console.error(err);
        next(err);
    }
})
   .post(async (req,res,next) => {
    const {id, password,name} = req.body;
    if (!password) return next('비밀번호를 입력하세요');
    const user = await User.findOne({ where:{id} });
    if(user) {
        next('이미 등록된 사용자 입니다.');
        return;
    }
    try {
        const hash = await bcrypt.hash(password,12);
        await User.create({
            id,
            password : hash,
            name
        });
        res.redirect('/');
    }catch(err) {
        console.error(err);
        next(err);
    }
});
// 로그인 
router.get('/login', (req,res)=>{
    res.render('login.ejs');
});
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (user) req.login(user, loginError => res.redirect('/'));  
        else next(`Login fail!`); 
    }) (req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});
// My Account
router.get('/account',(req,res) => {
    res.render('account.ejs');
})

module.exports = router;
