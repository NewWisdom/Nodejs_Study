var express = require('express');
var router = express.Router();
const uuidv4=require('uuidv4')
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
    userID:req.user.id,
    host:req.body.host,
    type:req.body.type,
    clientSecret:uuidv4(), // 비밀키 발급 해 줄거임
  })
})
module.exports = router;
