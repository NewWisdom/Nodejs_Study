var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const {isLoggedIn} = require('./middlewares')
const { Post, Hashtag, User } = require('../models');

var upload = multer({
    storage: multer.diskStorage({
        destination(req,file,cb){
            cb(null,'uploads/') // 처음이 null 인 이유는 첫번째 인자는 error이기 떄문
        },
        filename(req,file,cb){
            const ext = path.extname(file.originalname);
            cb(null,path.basename(file.originalname,ext)+new Date().valueOf()+ext)
        }
    }),
    limit:{fileSize: 5*1024*1024},
}); 


// img는 아이디 값이 img라서
router.post('/img',isLoggedIn,upload.single('img'),(req,res)=>{
    console.log(req.file);
    res.json({url:`/img/${req.file.filename}`})
});

const upload2 = multer();
router.post('/',isLoggedIn,upload2.none(),async (req,res,next)=>{
    // 게시글 업로드
    //console.log(req.user.id)
    try{
        const post = await Post.create({
            content:req.body.content,
            img : req.body.url,
            userId: req.user.id,
        });
        const hashtags = req.body.content.match(/#[^\s]*/g);
        if(hashtags){
            // 해시태그가 배열이면, 그리고 중복된 해시태그는 저장할 필요 없다.
            const result = await Promise.all(hashtags.map(tag=>Hashtag.findOrCreate({
                where: {title : tag.slice(1).toLowerCase()}, // # 지움, 소문자로 다 바꿈
            })));
            await post.addHashtags(result.map(r=>r[0])) // 게시글과 해시태그 연결햐줌
        }
        res.redirect('/')
    }catch(error){
        console.error(error);
        next(error);
    }
})

router.get('/hashtag',async(req,res,next)=>{
    const query = req.query.hashtag;
    if(!query){
        return res.redirect('/');
    }
    try{
        const hashtag = await Hashtag.find({where:{title:query}});
        let posts = [];
        if(hashtag){
            // A.getB : 관계있는 row 조회
            // A.addB : 관계 생성
            // A.setB : 관계 수정
            // A.removeB : 관계 제거
            post = await hashtag.getPosts({
                include : [{model : User}]
            })
        }
        return res.render('main',{
            title : `${query} | Nodebird`,
            user : req.user,
            tiwits : posts, // 검색 결과
        })
    }catch(error){
        console.error(error)
        next(error);
    }
})
module.exports = router;