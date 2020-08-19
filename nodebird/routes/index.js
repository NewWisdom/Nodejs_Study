var express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', { 
    title: 'Express',
    twits:[],
    user:req.user 
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

router.use('/upload',require('./upload'));
router.use('/user',require('./users'));
module.exports = router;
