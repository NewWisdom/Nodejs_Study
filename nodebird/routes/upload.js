var express = require('express');
var router = express.Router();
const multer = require('multer');

// 1. 파일 위치 지정을 dest 옵션으로 할 경우
var upload = multer({dest:'uploads/'}); 

// // 2. 파일 저장 위치를 diskStorage()함수로 지정할 경우
// var storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null, 'uploads/');
//     },
//     filename:(req,file,cb)=>{
//         cb(null,Date.now()+'-'+file.originalname);
//     }

// });
// var upload = multer({storage:storage});

router.post('/',upload.single('userfile'),(req,res)=>{
    console.log(req.file);
    res.send('upload: '+req.file.filename);
});

router.get('/',(req,res)=>{
    res.render('uploadform');
})

module.exports = router;