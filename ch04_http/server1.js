// http가 server1.js를 서버 프로그램으로 만들어준다.
// 노드는 서버가 아니라 런타임이다!
const http = require('http')

// 서버 만들기
const server = http.createServer((req,res)=>{
    // req : 요청, rea : 응답
    console.log('서버 실행');
    res.write('<h1>Hello Node</h1>') // res.write 는 여러번 쓸 수 있다.
    res.write('<h2>Hello Node</h2>')
    res.end('<p>Hello Server!</p>') // 응답이 끝남을 알려줌
}).listen(8080,()=>{ // 서버를 요청 대기 상태로 만든다.
    console.log('8080번 포트에서 서버 대기중입니다.')
});

server.on('error',(error)=>{
    console.error(error);
});
