// 1. class를 이용한 객체 생성
class Person {
    // constructor: 객체 생성 시 자동으로 실행되며, 객체의 기본 속성을 생성하는 역할. 생성자 함수와 동일
    constructor(name, first, second) {
        this.name = name
        this.first = first
        this.second = second
    }
    // class에서 sum을 정의하는 방법. prototype을 이용해 메소드를 선언하는 것과 동일함. 이는 객체 생성 시 메모리 단으로 저장되지 않음
    sum() {
        return this.first + this.second
    }
}

// 한 객체만의 메소드를 별도로 지칭하고자 할 때는 다음과 같이 별도로 선언하면 된다.
const kim = new Person('kim', 1, 2)
// 화살표 함수는 this 바인딩을 가지지 않고 상위 스코프를 바라보므로, this로 객체의 값을 확인할 수 없음.
kim.sum = function () {
    console.log(this.first, typeof this.first)
    return this.first + 10
}

console.log(kim.sum())

// 2. class의 상속과 super
class BaseballPlayer extends Person {
    constructor(name, first, second, battingAvg) {
        // 부모 클래서의 constructor를 호출하여 property 생성
        super(name, first, second)
        this.battingAvg = battingAvg
    }

    sum() {
        // 부모 클래스의 메소드를 호출
        return super.sum() + this.battingAvg
    }

    avg() {
        return (super.sum() + this.battingAvg) / 3
    }
}

const baseballPlayer = new BaseballPlayer('yu', 1, 2, 3)

console.log(baseballPlayer)
console.log(baseballPlayer.sum())
console.log('baseballplayer avg origin by BaseballPlayer prototpye', baseballPlayer.avg())


// 3. javascript에서 객체 간 상속 (__proto__, Object.create())
const superObj = {
    super: 'super',
    sum: function () {
        return this.super + ' sum'
    }
}
const subObj = {
    sub: 'sub',
    avg: function () {
        // 이 떄, this는 객체에서 지칭된 바가 없으면 부모의 속성을 호출한다.
        return this.super + this.sub + ' avg'
    }
}

// 객체 간 상속에 이용되는 __proto__, 권장되지 않음
subObj.__proto__ = superObj
console.log(subObj.super)
console.log('subObj.sum()', subObj.sum())
console.log('subObj.avg()', subObj.avg())

// Object.create()를 이용한 상속(prototype link 지정)
const alphaObj = Object.create(superObj)
alphaObj.avg = function () {
    return this.super + this.sub + ' avg'
}
alphaObj.super = 'alpha'
alphaObj.sub = 'beta'
console.log('alphaObj.sum()', alphaObj.sum())
console.log('alphaObj.avg()', alphaObj.avg())


// 4; javascript에서 객체와 함수 : call과 bind
const a = { name: 'a', first: 10, second: 10 }
const b = { name: 'a', first: 10, second: 20 }

function sum(prefix) {
    return prefix + this.first + this.second
}
// call을 통해 sum의 this는 각각 a,b가 된다. 즉, sum의 실행 시점에서 실행되는 context를 바꾸는 것이다. call의 리턴값은 sum의 리턴값이다.
//  call(Object, parameter...)
console.log(sum.call(a, 1))
console.log(sum.call(b, 2))

// bind를 통해 sum의  this에 해당할 객체를 고정하여 새로운 함수를 생성할 수 있다. bind의 리턴값은 함수이다.
console.log(sum.bind(a, 3)) // function
const bSum = sum.bind(b)
console.log(bSum(4)) // 34

// 5. 생성자 함수를 이용한 객체 생성
function Human(name, first, second) {
    this.name = name
    this.first = first
    this.second = second
}
Human.prototype.sum = function () {
    return this.first + this.second
}

const yu = new Human('yu', 1, 2)

// 5-1. 생성자 함수를 이용한 상속 : class 상속의 메커니즘 쪼개기
function HumanPlus(name, first, second, third) {
    // class의  extends와 super 역할을 함. Human이란 생성자 함수를 call을 이용해 실행 context를 HumanPlus로 맞춰 Human의 property를 공유하게 함.
    Human.call(this, name, first, second)
    this.third = third
}

// humanplus의 prototype이 Human prototpye을 바라보도록 함. HumanPlus로 생성된 객체가 Human의 metohd, prorperty를 공유받게 됨
// HumanPlus.prototype.__proto__ = Human.prototype // __proto__를 이용한 prototype link 할당 : 이 때, HumanPlus prototpye의  connstructor는 여전히 HumanPlus이다.
HumanPlus.prototype = Object.create(Human.prototype) // object.create 를 이용한 prototype link 할당, 이 때, HumanPlus의 prototpye의 constructor는 Human으로 replace된다.
// Object.create로 constructor가 Human으로 변경되는 것을 방지
HumanPlus.prototype.constructor = HumanPlus
HumanPlus.prototype.avg = function () {
    return (this.first + this.second + this.third) / 3
}

const park = new HumanPlus('park', 1, 2, 3)
console.log('park.sum() : inherited by Human prototype', park.sum())
console.log('park.avg() : origin in HumanPlus prototype', park.avg())
