const Sequelize = require('sequelize');
module.exports = (sequelize, DataType)=>{
    return sequelize.define('domain',{
        host:{
            type:DataType.STRING(80),
            allowNull:false,
        },
        type:{
            type:DataType.STRING(10),
            allowNull:false,
        },clientSecret :{
            type:DataType.STRING(40),
            allowNull:false
        },
        frontSecret :{
            type:DataType.STRING(40),
            allowNull:false
        }
    },
    {
        timestamps:true,
        paranoid:true, // 삭제 기록
        validate:{ // 검증
            unknownType(){
                if(this.type !== 'free'&&this.type !=='premium'){
                    throw new Error('type 컬럼은 free거나 premium이어야 합니다.')
                }
            }
        },
    })
}