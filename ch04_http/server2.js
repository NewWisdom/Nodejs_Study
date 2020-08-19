// http가 server1.js를 서버 프로그램으로 만들어준다.
// 노드는 서버가 아니라 런타임이다!
const http = require('http');
const fs=require('fs');

// 서버 만들기
const server = http.createServer((req,res)=>{
    // server2.html 파일 읽기
    fs.readFile('./server2.html',(err,data)=>{
        if(err){
            throw err;
        }
        // res 객체에 html 파일 담음
        res.end(data);
    })
}).listen(8080,()=>{ // 서버를 요청 대기 상태로 만든다.
    console.log('8080번 포트에서 서버 대기중입니다.')
});

server.on('error',(error)=>{
    console.error(error);
});
