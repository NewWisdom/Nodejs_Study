const express = require('express')
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const user = require('../ch07_learn-sequelize/models/user');
const flash = require('flash')
require('dotenv').config;

const indexRouter = require('./routes/index');

const { sequelize } = require('./models');

const app = express()

sequelize.sync()

app.set('view engine','html')
app.set('views',path.join(__dirname,'public'))
app.set('port',process.env.PORT||8001)

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cookieParser('nodebirdsecret'))
app.use(session({
    resave :false,
    saveUninitialized:false,
    secret:'nodebirdsecret',
    cookie:{
        httpOnly:true,
        secure:false,
    }
}))
app.use(flash())


app.use('/',indexRouter);

app.use((req,res,next)=>{
    const err = new Error("Not Found");
    err.status=404;
    next(err)
})

app.use((err,req,res)=>{
    res.locals.message = err.message;
    res.locals.console.error=req.app.get('env');
    res.status(err.status||500);
    res.render('error')
})
app.listen(app.get('port'),()=>{
    console.log('8001번 포트에서 서버 실행 중')
})