var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/sound',function(req, res, next) {
  const value = req.body;
  const {id} = req.params.id;
  router.get('sound/:id',function(req,res,next){
    // 안드
    res.status(200).send({value:value})
  })
  res.send('respond with a resource');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', { 
    title: 'Express',
    twits:[],
    user:req.user 
  });
});

module.exports = router;
