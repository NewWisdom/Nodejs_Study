'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; // 환경변수 실제 배포일떄ㅡㄴ production으로 바꿔야한다.
const config = require(__dirname + '/../config/config.json')[env]; // config 파일 위치, env=key로
const db = {};// db 객체 생성

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize,Sequelize);
db.Post = require('./post')(sequelize,Sequelize);
db.Hashtag = require('./hashtag')(sequelize,Sequelize);

db.User.hasMany(db.Post); // 1
db.Post.belongsTo(db.User); // n

// 다대다 관계에서는 새로운 모델이 생김
// through 에는 새로 생기는 모델
db.Post.belongsToMany(db.Hashtag,{through:'PostHashtag'})
db.Hashtag.belongsToMany(db.Post,{through:'PostHashtag'})

// 팔로우 관계
// as : 매칭 모델 이름
// foreignKey : 상대 테이블 아이디
db.User.belongsToMany(db.User,{through:'Folllow', as: 'Followers',foreignKey:'followingId'}); // 일반인
db.User.belongsToMany(db.User,{through:'Follow', as: 'Following', foreignKey :"followerId"}); // 유명인

//1 제로
// 2 네로
// 3 히어로
// 1-2
// 2-3
// 3-1

db.User.belongsToMany(db.Post,{through:'Like'})
db.Post.belongsToMany(db.User,{through:'Like'})

module.exports = db;
