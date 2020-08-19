var jihye = {
    name : 'Shin Jihye',
    age : 23,
    hobby : ['programming','watching movie','swimming'],
    printName(){
        console.log('name',this.name);
    },
    printAge(){
        console.log('age',this.age);
    }
}

console.log('jihye : '+jihye);
console.log('jihye : ',jihye);
console.log('jihye : '+JSON.stringify(jihye))


// 2. json 배열 실습
var dogs=[
    {name: '쿠키', family :'웰시코기', age : 1},
    {name: '초코', family: '시츄', age: 2}
]

console.log('dogs : '+dogs)
console.log('dogs : ',dogs)
console.log('dogs : '+JSON.stringify(dogs))

dogs.forEach(
    dog => console.log(dog.name+'는 종이'+dog.family+'입니다!')
)