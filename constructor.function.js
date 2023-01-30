
// 2. 생성자 함수를 이용한 객체 생성
// 함수도 객체이므로, Person 함수 생성시, Person.prototype도 함께 생성. 최초 생성 시에는 빈 객체.
function Person(name, age) {
    this.name = name
    this.age = age

    Object.defineProperty(this, 'intro with location', {
        get() {
            return this.__intro
        },
        set(location) {
            this.__intro = `hi my name is ${this.name}, age: ${this.age}, location: ${location}`
        }
    })

    // method지만 property로 간주된다.
    // this.intro = () => {
    //     return `hi my name is ${this.name}`
    // }
}

// 생성자 함수로 객체 생성 시, 객체에는 Person의 prototype을 바라보는 __proto__ 객체 생성됨.
const kim = new Person('kim', 15)
console.group('생성자 함수에서 메소드 생성 without prototype')
console.log(new Person) //    Person {name: undefined,age: undefined,intro: [Function (anonymous)] }
console.log(Person.prototype) //   {}
console.log(kim.__proto__) // {}
// console.log(kim.intro()) // hi my name is kim
console.groupEnd()


console.group('단일 객체만을 위한 메소드 할당')
// 외부 코드에서 객체 생성자가 아니라 단일 객체에 property 혹은 method 할당.
kim.intro = function () {
    return `from outer`
}
console.log(kim.intro()) // from outer(O) | hi my name is kim(X)
console.groupEnd()


console.group('생성자 함수에서 메소드 생성 with prototype')
// array function일 경우, this 바인드가 되지 않음.
// 생성된 객체 조회 시, 생성된 메서드는 조회되지 않음.
Person.prototype.intro = function () {
    return `hi my name is ${this.name}`
} // Person에서 this.intro는 선 주석처리
console.log(new Person) //   Person { name: undefined, age: undefined }
console.log(Person.prototype) //   { intro: [Function (anonymous)] }
console.log(kim.__proto__) //   { intro: [Function (anonymous)] }
console.groupEnd()

console.group('call과 bind를 이용한 함수 this 바인딩')
function Human() {
    return `hello ${this.name}`
}
console.log(Human.call({ name: 'kim' })) // call: 실행 중 context를 주입하여 그 결과를 return // hello kim
console.log(Human.bind({ name: 'kim' })) // bind: 인자로 받은 context로 실행되는 새 함수를 return // function
console.groupEnd()

console.group('생성자 함수 간 상속')
// 상속 관계에서 메소드 인식
// 1. 객체의 property > 2. 자식 prototype > 3. 부모 prototype
function Android(name, age, robotId) {
    Person.call(this, name, age)
    this.robotId = robotId
}

Android.prototype = Object.create(Person.prototype)
Android.prototype.constructor = Android // Person을 상속은 하되, constructor는 Android임을 명시
Android.prototype.intro = function () {
    return 'hello android'
}
const robot = new Android('alpha', 1, true)
console.log('android prototype', Android.prototype)
console.log('person prototype', Person.prototype) // function: Person
console.log('android constructor', Android.prototype.constructor) // function: Android
console.log('android object proto', robot.__proto__) // Person{constructor, intro}
console.log(robot) //  Android {name: 'alpha',age: 1,intro: [Function (anonymous)],robotId: true}
console.log(robot.intro()) //   hi my name is alpha | hello android(android prototpye에 메소드 명시)
console.groupEnd()