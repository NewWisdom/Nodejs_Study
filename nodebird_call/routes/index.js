var express = require('express');
const axios = require('axios');
const { RequestHeaderFieldsTooLarge } = require('http-errors');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test',async (req,res,next)=>{
  try{
    if(!req.session.jwt){ // 세션에 토큰이 없으면
      const tokenResult = await axios.post('http://localhost:8002/v1/token',{
        clientSecret :process.env.CLIENT_SECRET,

      })
      if(tokenResult.data && tokenResult.data.code ===200){
        req.session.jwt = tokenResult.data.token
      }else{
        return res.json(tokenResult.data)
      }
    }
    const result = await axios.get('http://localhost:8002/v1/test',{
      headers : {authorization : req.session.jwt}
    })
    return res.json(result.data);
  }catch(error){
    console.error(error);
    return next(error);
  }
})
const request = async(req,api)=>{
  try{
    if(!req.session.jwt){
      const tokenResult = await axios.post('http://localhost:8002/token',{
        clientSecret :process.env.CLIENT_SECRET,
      })
      req.session.jwt = tokenResult.data.token;
    }
    return await axios.get(`http://localhost:8002/v1${api}`,{
      headers : {authorization : req.session.jwt}
    });
  }catch(error){
    console.error(error);
    next(error)
  }
}
// call서버 -> api 서버
// /mypost -> /posts/my
// /search -> /posts/hashtag
router.get('/mypost',async(req,res,next)=>{
  try{
    const result = await request(req,'/posts/my',);
    res.json(result.data)
  }catch(error){
    console.error(error);
    next(error)
  }
})
router.get('/search/:hashtag',async(req,res,next)=>{
  try{
    const result = await request(
      req,`/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`,
    );
    res.json(result.data)
  }catch(error){
    console.error(error);
    next(error)
  }
})
module.exports = router;
