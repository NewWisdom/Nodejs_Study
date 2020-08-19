// try catch는 권장하지는 않는다.
// 에러를 낸다음 잡으려 하지 마라.
setInterval(()=>{
    console.log('시작')
    try{
        throw new Error('서버를 고장내주자!')
    }catch(error){
        console.error(error)
    }
},1000)

// 예상 치 못한 에러 처리. 하지만 근본적 에러 처리는 하지 못함.
process.on('uncaughtException',(err)=>{
    console.error('예기치 못한 에러',err)
})
setInterval(()=>{
    throw new Error('서버 고장내주마')
},1000)