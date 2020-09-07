const jwt = require('jsonwebtoken')
const RateLimit = require('express-rate-limit')

exports.isLoggedIn =(req,res,next)=>{
  if(req.isAuthenticated()){
      next()
  }else{
      res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req,res,next)=>{
  if(!req.isAuthenticated()){
      next();
  }else{
      res.redirect('/')
  }
}

exports.verifyToken = (req,res,next)=>{
  try{
    req.decoded = jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
    console.log(req.decoded)
    return next()
  }catch(error){
    if(error.name==='TokenExpiredError'){
      return res.status(419).json({
        code:419,
        message:"토큰이 만료되었습니다."
      })
    }
    return res.status(401).json({
      code:401,
      message:"유효하지 않은 토큰입니다."
    })
  }
}

// 토큰 너무 자주 발급받지 못하게
exports.apiLimiter = new RateLimit({
  windowMs: 60*1000, // 이 시간 동안
  max : 1, // 최대 횟수
  delayMs:0, // 요청 간 간격
  handler(req,res){ // 어겼을 경우 메시지
    res.status(this.statusCode).json({
      code:this.statusCode, // 기본 429
      message:'무료 사용자는 1분에 한번만 요청할 수 있습니다.'
    })
  }
})
exports.premiumApiLimiter = new RateLimit({
  windowMs: 60*1000, // 이 시간 동안
  max : 1000, // 최대 횟수
  delayMs:0, // 요청 간 간격
  handler(req,res){ // 어겼을 경우 메시지
    res.status(this.statusCode).json({
      code:this.statusCode, // 기본 429
      message:'유료 사용자는 1분에 1000만 요청할 수 있습니다.'
    })
  }
})
exports.deprecated = (req,res)=>{ 
  res.status(419).jsom({
    code:419, // 419는 토큰 만료
    message:"새로운 버전이 나왔습니다. 새로운 버전을 사용하세요."
  })
}