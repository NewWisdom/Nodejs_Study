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

db.User=require('./user')(sequelize,Sequelize);
db.Comment = require('./comment')(sequelize,Sequelize);

db.User.hasMany(db.Comment, {foreignKey:'commeneter', sourceKey:'id'})
db.Comment.belongsTo(db.User,{foreignKey:'commeneter',targetKey:'id'})
module.exports = db;
