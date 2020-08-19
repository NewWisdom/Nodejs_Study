let isMomHappy = false
let phone ={
    brand:'Samsung',
    color:'balck'
};

var willGetNewPhone = new Promise((resolved,rejected)=>{
    if(isMomHappy){
        resolved(console.log(JSON.stringify(phone)))
    }else{
        rejected(console.log('mom is not happy'))
    }
})
