const express = require('express')
const router = express.Router();

// 프로필 페이지
router.get('/profile',(req,res)=>{
    res.render('profile',{title:'내 정보 - NodeBired',user:null});
})

// 회원가입 페이지
router.get('/join',(req,res)=>{
    res.render('join',{
        title:'회원가입 - NodeBird',
        user : null,
        joinError : req.falsh('joinError')
    });
});

// 메인 페이지
router.get('/',(res,req,next)=>{
    res.render('main',{
        title:'NodeBird',
        tiwts:{},
        user : null,
        joinError : req.falsh('loginError')
    });
})
module.exports = router;