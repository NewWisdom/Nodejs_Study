var express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.findAll({ 
    include : [{ //user model에서 불러옴
      model : User,
      attributes : ['id','nick'],
    },{
      model:User,
      attributes:['id','nick'],
      as:'Liker', // 좋아요를 누른 사람을 가져옴 / include에서 같은 모델이 여러개면 as로 구분한다.  
    }]
  })
  .then((posts)=>{ // 그러면 posts에 담긴다.
    res.render('main',{
      title:'NodeBird',
      twits:posts,
      user:req.user,
    })
  });
});

router.get('/profile',isLoggedIn, (req,res)=>{
  res.render('profile',{title:'내 정보 - NodeBird',user:req.user});
});

router.get('/join',isNotLoggedIn,(req,res)=>{
  res.render('join',{
    title:"회원가입 - NodeBird",
    user:req.user
  });
});

router.use('/user',require('./users'));
module.exports = router;
