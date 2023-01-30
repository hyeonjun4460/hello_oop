//  객체 예제

// 1. 객체의 기본 구성
// 객체는 크게 property(변수)와 method(함수)를 가진다.
// property는 data property와 accsessor property로 구분된다.
// accessor property는 함수로 표현되나, 외부 코드에서는 property로 간주된다.
const sampleObj = {
    // data property
    id: 1,
    name: 'kim',

    // accessor property (get,set) 
    get intro() {
        return this.__intro
    },
    set intro(age) {
        this.__intro = this.id + this.name + age
    },

    // method
    hello: function () {
        return `hello ${this.name}`

    }
}
console.group('객체의 기본 구조')
console.log(sampleObj)
sampleObj.intro = '15' // set
// sampleObj.intro(15) //error
console.log(sampleObj.intro) // get
console.log(sampleObj.hello()) // method
console.groupEnd()

// accessor property를 이용해 객체 내부의 property에 대한 외부 접근을 제한할 수 있다.
// getter와 setter는 외부 코드로부터 객체를 보호하는데 이용될 수 있다.
const example = {
    get name() {
        return this.__name
    },
    set name(value) {
        // setter를 이용해 property 예외처리
        if (value.length < 3) {
            throw new Error('이름이 너무 짧습니다')
        }
        this.__name = value
    }
}
// console.log(example.getName) // undefined
console.group('get/set을 이용한 외부 접근 제어')
example.name = 'hello'
console.log(example.name) // 'hello'
// console.log(example.name = 'hi') // setter에서 예외처리
console.groupEnd()
