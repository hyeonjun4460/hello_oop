# hello_oop

oop tutorial with 생활코딩 JavaScript Object Oriented Programming

## 1. 객체의 개념

- 객체는 서로 연관된 변수와 함수를 그룹핑한 것을 의미한다.

## 2. OOP(객체지향프로그래밍)

- 객체지향프로그래밍이란 그러한 객체 개념을 활용하여 프로그램을 설계하는 것을 의미한다.
- 요컨대, 프로그램을 여러 객체 간의 상호작용으로 간주하는 것이다.

## 3. 개념 메모

- 객체는 key와 value의 구조로 property와 method로 구성되어 있으며, 객체는 연관된 변수와 함수로 구성된다.
- method: 객체에 속한 함수는 함수가 아니라 "메소드"라고 지칭한다.
- this: 객체에 속한 메소드에서 객체를 가리키는 것
- 객체의 샏성은 리터럴하게 {}로 만드는 것과 생성자 함수를 이용하는 방법, class를 활용하는 방법이 있다.

### 1) 생성자 함수와 prototype

- 생성자 함수는 constructor function이라고 하는데, 이는 기본 함수와 new 를 이용해서 만들 수 있다. 이는 객체와 객체의 기본 속성을 생성하는 함수다.
- 생성자 함수에서 생생되는 것은 모두 property로 간주되고, 메모리 단으로 저장된다. 그러므로 함수들은 property가 아니라 method로서 선언되도록 하는 게 좋다. 이 떄 활용되는 게 prototype이다.
- prototype: 객체들이 공통적으로 공유하는 property와 method의 원형을 의미한다. 이는 메모리 단으로 저장되지 않는다.
- 즉, 객체를 생성할 때, 일반적으로 변수들은 property로 취급해서 생성자 함수로 생성하는 것이 좋고, method는 prototye을 이용해서 생성하는 것이 성능 절약에 좋다.
- 한 객체에서 호출되는 메소드는 그 객체 자체에서 선언된 메소드를 먼저 확인하고, 그 뒤에 prototype에서 선언된 메소드를 확인하여 호출한다.

### 2) class

- ES 6 버전부터 등장한 문법.
- class는 생성자 함수와 prototype을 이용해 객체를 생성하는 방식을 축약한 문법이라고 할 수 있다.

#### (1) 상속

- 특정 class의 property와 method를 상속받는 다른 class를 생성할 때 활용됨.
- 상속을 하게 될 경우, 유지보수의 편의성이 크게 증대한다.
- super라는 용법을 통해 부모 클래스의 생성자와 method를 호출할 수 있다. 이는 자식 클래스에 property나 method를 추가할 때, 코드의 중복을 제거하는데 매우 유용하다.

### 3) 객체지향언어와 javascript의 객체지향

- 객체지향언어를 지탱하는 두 축은 class와 class로 생성한 object instance이다.
- java와 같은 객체지향언어는 모든 것이 class에 의해서 결정된다.
- 생성된 object가 할 수 있는 일은 모두 그것의 원형인 class들(부모, 자식 클래스들) 의해 결정되는 것이다. 아울러, object 간의 상속은 불가능하다.
- javascript의 경우, object 끼리의 상속이 가능하며, 상속 관계를 변경할 수도, 상속하고자 하는 object를 쉽게 변경할 수 있다. 이 때, 상속할 객체의 변경은 prototype link를 이용할 수 있고, 대상 객체는 prototype object라고 한다.
- javascript에서 객체 간 직접 상속에는 "**proto**" 혹은 Object.create()를 이용할 수 있다.

### 4) javascript에서 객체와 함수

- 객체지향언어에서 함수는 일반적으로 객체에 종속된다.
- javascript에서 함수는 그 또한 객체로 간주된다. 즉, javascript에서 함수는 property와 method를 가진다.
- javascript에서 함수는 객체에 종속되지 않아도 사용가능하며, 필요에 따라 call, bind와 같은 javascript에서 기초적으로 함수가 내장하고 있는 메소드를 통해 해당 함수를 다른 객체에 상속시킬 수 있다.

### 5) javascript 객체 생성의 메커니즘

- javscript에서 객체 생성자를 생성하면(함수도 객체이므로 포함이다) 생성자와 함께 생성자의 prototype이 생성된다.
- 이 때, 생성자는 prototype, prototype은 constructor라는 property를 가지게 되고 각 property를 통해 상호 참조한다.
- 생성자를 통해 생성된 "객체"는 **proto**라는 property를 통해 생성자의 prototype을 참조한다.
- prototype에는 생성자를 통해 생성될 객체들이 공유할 기본적인 property와 method에 대한 데이터가 담겨있다.
- 즉, class에서 선언하는 method는 이 prototpye에 저장되는 것이다.
- 객체에서 객체에 선언되지 않은 method를 실행할 수 있는 것은 이 prototype을 참조하기 떄문이다.
