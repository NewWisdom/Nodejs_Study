const express=require('express')
const router = express.Router();
const {User, Comment} = require('../models');
const comment = require('../models/comment');
const { connect } = require('../app');

// GET /comment
// GET /comment/id

router.get('/:id',function(req,res,next){
    Comment.findAll({
        include : {
            model:User,
            where:{id:req.params.id},
        }
    })
        .then((comments)=>{
            console.log(comments);
            res.json(comments);
        })
        .catch((err)=>{
            console.error(err)
            next(err)
        })
})

router.patch('/:id',(req,res,next)=>{
    Comment.update({
        comment:req.body.comment,
    },{
        where:{id : req.params.id},
    })
        .then((result)=>{
            console.log(result)
            res.json(result)
        })
        .catch((err)=>{
            console.error(err)
            next(err)
        })
})

router.delete('/:id',(req,res,next)=>{
    
})
router.post('/',(req,res,next)=>{
    Comment.create({
        commenter:'',
        comment:req.body.comment,
      })
        .then((result)=>{
          console.log(result)
          res.status(201).json(result);
        })
        .catch((err)=>{
          console.error(err);
          next(err);
        })
})