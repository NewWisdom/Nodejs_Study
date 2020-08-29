const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize,Sequelize);
db.Post = require('./post')(sequelize,Sequelize);
db.Hashtag = require('./hashtag')(sequelize,Sequelize);
db.Domain = require('./domain')(sequelize,Sequelize);

db.User.hasMany(db.Post); // 1
db.Post.belongsTo(db.User); // n

// 다대다 관계에서는 새로운 모델이 생김
// through 에는 새로 생기는 모델
db.Post.belongsToMany(db.Hashtag,{through:'PostHashtag'})
db.Hashtag.belongsToMany(db.Post,{through:'PostHashtag'})

// 팔로우 관계
// as : 매칭 모델 이름
// foreignKey : 상대 테이블 아이디
db.User.belongsToMany(db.User,{through:'Follow', as: 'Followers',foreignKey:'followingId'}); // 일반인
db.User.belongsToMany(db.User,{through:'Follow', as: 'Followings', foreignKey :"followerId"}); // 유명인

//1 제로
// 2 네로
// 3 히어로
// 1-2
// 2-3
// 3-1

db.User.belongsToMany(db.Post,{through:'Like'})
db.Post.belongsToMany(db.User,{through:'Like', as:'Liker'})

db.User.hasMany(db.Domain);
db.Domain.belongsTo(db.User);
module.exports = db;
