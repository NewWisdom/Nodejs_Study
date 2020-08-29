var express = require('express');
var router = express.Router();
const uuidv4=require('uuid').v4
const {User,Domain} = require('../models');


/* GET home page. */
router.get('/', (req, res, next) => {
  User.findOne({
    where: { id: req.user && req.user.id || null },
    include: { model: Domain },
  })
    .then((user) => {
      res.render('login', {
        user,
        domains: user && user.domains,
      });
    })
    .catch((error) => {
      next(error);
    });
    
});

router.post('/domain',(req,res,next)=>{
  Domain.create({
    userId:req.user.id,
    host:req.body.host,
    type:req.body.type,
    clientSecret:uuidv4(), // 비밀키 발급 해 줄거임, 고유한 값을 만들어주는 패키지
  })
  .then(() => {
    console.log("user :",req.user.id)
    res.redirect('/');

  })
  .catch((error) => {
    next(error);
  });
})
module.exports = router;
