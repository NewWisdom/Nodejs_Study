const fs = require('fs');

const text = 'write Test'
// 비동기 
fs.writeFile('hello.txt',text,'utf-8',(err,data)=>{
    if(err){
        throw err;
    }
    console.log(data);
})

//동기
fs.writeFileSync('hello.txt0,text','utf-8')
