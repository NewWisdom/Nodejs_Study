const Sequelize = require('sequelize');

module.exports = ((sequelize,DataTypes)=>{
    return sequelize.define('hashtag',{
        title: { // ex) #노드 #익스프레스
            type: Sequelize.STRING(15),
            allowNull: false,
            unique: true,
          },
    },{
        timestamps:true,
        paranoid : true, // 삭제일 (복구용)
    })
})