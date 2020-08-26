var express = require('express');
var router = express.Router();
const {isLoggedIn} = require('./middlewares');
const { User } = require('../models');

router.post('/:id/follow',isLoggedIn,async(req,res)=>{
  try{
    const user = await User.find({where : {id:req.user.id}}); // 현재 나를 찾아서 // req.user은 passport/index.js에서 만든다. 
    // id의 사용자를 추가함
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  }catch(error){
    console.error(error);
    next(error);
  }
})

module.exports = router;
