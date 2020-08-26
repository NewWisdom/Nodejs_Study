const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const {User} = require('../models');

module.exports = (passport)=>{
    passport.serializeUser((user,done)=>{
        // {id:1, name: jihye, age: 23}
        done(null,user.id);
    });
    passport.deserializeUser((id,done)=>{
        // 1-> {id:1,name:zero, age:23} -> req.user
        User.findOne({
                where:{id},
                include:[{
                    // Follower 를 가져옴
                    model:User, 
                    attributes:['id','nick'],
                    as: 'Followers' // models/index를 찾아보아라
                }, {
                    // Following을 가져옴
                    model:User,
                    attributes:['id','nick'],
                    as: 'Followings', // models/index를 찾아보아라
                }]
            }) // 현재 내가 누군지
            .then(user=>done(null,user))
            .catch(err=>done(err))
    });
    local(passport);
    kakao(passport);
}