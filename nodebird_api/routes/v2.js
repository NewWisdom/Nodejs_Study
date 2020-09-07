const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const url = require('url');

const {verifyToken,apiLimiter, premiumApiLimiter} = require('./middlewares')
const {Domain,User,Post,Hashtag} = require('../models');


const router = express.Router();

//cors 안에 hostname 넣어줄 수도 있다.
// 응답 헤더에 access control allow origin 헤더를 넣어준다.
//router.use(cors()); 
// 미들웨어 커스텀
router.use(async (req,res,next)=>{
    const domain = await Domain.findOne({
        where : { host: url.parse(req.get('origin')).host}
    })
    if (domain){
        cors({origin:req.get('origin')})(req,res,next);
    }else{
        next()
    }
})

router.use(async (req,res,next)=>{
    const domain = await Domain.findOne({
        where : {host : url.parse(req.get('origin')).host}
    })
    if (domain.type === 'premium'){
        premiumApiLimiter(req,res,next)
    }else{
        apiLimiter(req,res,next)
    }
})
router.post('/token',async(req,res)=>{
    const {clientSecret} = req.body
    try{
        const domain = await Domain.findOne({
            where:{frontSecret},
            include:{
                model:User,
                attribute:['nick','id']
            }
        });
        if(!domain){
            return res.status(401).json({
                code:401,
                message:"등록되지 않은 도메인 입니다."
            })
        }
        const token = jwt.sign({
            id:domain.user.id,
            nick : domain.user.nick,
        },process.env.JWT_SECRET,{
            expiresIn:'1m',
            issuer:'nodeird'
        })
        return res.json({
            code:200,
            message:"토큰이 발급 되었습니다.",
            token,
        })
    }catch(error){
        return res.status(500).json({
            code:500,
            message:"서버 에러"
        })
    }
})

router.get('/test',verifyToken,(req,res)=>{
    res.json(req.decoded)
})

router.get('/posts/my',verifyToken,(req,res)=>{
    Post.findAll({
        where : {userId : req.decoded.id} // 토큰 안에 있는 id가져와서 게시글 가져온다.
    })
    .then((posts)=>{
        console.log(posts)
        res.json({
            code:200,
            payload : posts,
        })
    })
    .catch((error)=>{
        console.error(error);
        return res.status(500).json({
            code:500,
            message:'서버 에러',
        })
    })
})

router.get('/posts/hashtag/:title',verifyToken,async(req,res)=>{
    try{
        const hashtag = await Hashtag.findAll({
            where:{title:req.params.title}
        });
        if(!hashtag){
            return res.status(404).json({
                code:404,
                message:"검색 결과가 없습니다."
            })
        }
        const posts = await hashtag.getPosts();
        return res.json({
            code:200,
            payload:posts,
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            code:500,
            message:"서버에러"
        })
    }
})

router.get('/follow',verifyToken,async (req,res)=>{
    try{
        console.log("dmdkdmkamdkasmdkadnaln")
        const user = await User.findOne({where:{id:req.decoded.id}}) // 토큰에서 아이디 가져옴
        const follower = await user.getFollowers({attribute:['id','nick']});
        const following = await user.getFollowings({attribute : ['id','nick']});
        return res.json({
            code :200,
            follower,
            following
        })
    }catch(error){
        console.error(error)
        return res.status(500).json({
            code:500,
            message:'서버 에러'
        })
    }
})
module.exports = router;
