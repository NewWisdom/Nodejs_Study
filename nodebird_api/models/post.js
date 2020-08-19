const Sequelize = require('sequelize');

module.exports = ((sequelize,DataTypes)=>{
    return sequelize.define('post',{
        content: {
            type: Sequelize.STRING(140),
            allowNull: false,
          },
          img: { // 이미지에 대한 서버 주소를 저장
            type: Sequelize.STRING(200),
            allowNull: true,
          },

    },{
        timestamps:true,
        paranoid : true, // 삭제일 (복구용)
    })
})
