const EventEmitter = require('events');

const myEvent = new EventEmitter();

// 이벤트 리스닝 방법 (addListener와 on은 동일하다.)
// 이벤트 리스너는 여러개 달 수도 있다.
myEvent.addListner('방문',()=>{
    console.log('방문해줘서 감사~')
})
myEvent.on('방문',()=>{
    console.log('이거는 on 메소드~')
})

// once는 한번만 실행된다.
myEvent.once('특별이벤트',()=>{
    console.log('나는한번만 실행됨')
})

// 이벤트 호출 방법
myEvent.emit('방문');
myEvent.emit('특별아벤트');

// 모든 이벤트 제거
myEvent.removeAllListners();
// 특정 이벤트 제거
myEvent.remiveListner('방문');

// 이벤트 몇 개 존재하는지
myEvent.listenerCount('방문')