// class를 이용한 생성

// 1. class 기본 구조
class BaseballTeam {
    // property
    manager = 'hyenjun'

    // constructor : data property 생성
    constructor(league, grade) {
        this.league = league
        this.grade = grade
    }

    // accessor property
    get playerCount() {
        console.log(this.__players)
        if (!this.__players) {
            throw new Error('선수가 등록되어 있지 않습니다')
        }
        return this.__players.length
    }

    get players() {
        return this.__players
    }
    set players(value) {
        if (value.length === 0) {
            throw new Error('선수를 등록해주세요')
        }
        value.filter((data) => {
            if (data.battingChance && data.battingCount) return
            else { throw new Error(`${data} 선수의 타격 점수를 입력해주세요`) }
        })
        this.__players = value
    }

    addNewPlayer(data) {
        if (data.battingChance && data.battingCount) {
            this.__players.push(data)
            return `${data.name} 선수 등록 완료`
        }
        else { throw new Error(`${data} 선수의 타격 점수를 입력해주세요`) }
    }

    // method
    getPlayersBattingAvg() {
        for (const value in this.__players) {
            const player = this.__players[value]
            player.battingAvg = (player.battingCount / player.battingChance).toFixed(2, 5)
        }
        return this.__players
    }

    // 함수를 property로 넣기
    // hello = () => {
    //     return 'hi'
    // }
}

console.group('---------------------클래스 객체 생성 시 구조: 객체 생성과 함께 prototype이 생성되며, prototype에는 constructor와 method가 정의된다')
console.log(`BaseballTeam prototype's constructor`, BaseballTeam.prototype.constructor) // class BaseballTeam
console.log(`method in BaseballTeam`, Object.getOwnPropertyNames(BaseballTeam.prototype)) // [ 'constructor', 'playerCount', 'players', 'getPlayersBattingAvg' ]
const eagles = new BaseballTeam('자하문', '1')
console.log('object made by class BaseballTeam', eagles) // BaseballTeam { manager: 'hyenjun', league: '자하문', grade: '1' }
console.log(`object's prototype`, eagles.__proto__.constructor) // class BaseballTeam
console.groupEnd()

console.group(`---------------------클래스에서 get,set, method`)
// set
eagles.players = [
    { name: 'kim', battingChance: 5, battingCount: 3 },
    { name: 'yu', battingChance: 3, battingCount: 1 },
    { name: 'lee', battingChance: 4, battingCount: 2 },
]
console.log(eagles.players) // get: players array | length 3
console.log(eagles.playerCount) // get: 3
console.log(eagles.getPlayersBattingAvg()) // method
console.log(eagles.addNewPlayer({ name: 'park', battingChance: 10, battingCount: 2 })) // method
console.log(eagles.getPlayersBattingAvg()) // method
console.groupEnd()

// 2. 클래스를 이용한 상속
class SportsTeam {
    constructor(category, manager, location) {
        this.category = category
        this.manager = manager
        this.location = location
    }

    get playerList() {
        if (!this.__playerList) { throw new Error('선수 먼저 등록해주세요') }
        return this.__playerList
    }
    set playerList(value) {
        value.filter((data) => {
            if (!data.name) throw new Error(`${data}에 선수이름이 없어요`)
            return
        })
        this.__playerList = value
    }

    getPlayerCount() {
        if (!this.__playerList) { throw new Error('선수 먼저 등록해주세요') }
        return this.__playerList.length
    }
}

class SoccerTeam extends SportsTeam {
    constructor(category, manager, location) {
        super(category, manager, location)
    }

    get playerList() {
        return this.__playerList
    }
    set playerList(value) {
        if (value.length === 0) {
            throw new Error('선수가 0명입니다')
        }
        value.filter((data) => {
            if (data.name && data.score && data.assist) return
            else throw new Error(`${data} 선수의 기록을 등록해주세요`)
        })
        super.playerList = value
    }

    getPlayersStat() {
        for (const value in this.__playerList) {
            const player = this.__playerList[value]
            player.totalStat = player.score + player.assist
        }
        return this.__playerList
    }
}

console.group('-----------------클래스를 이용한 상속')
console.log(Object.getOwnPropertyNames(SportsTeam.prototype)) //  SportsTeam [ 'constructor', 'playerList', 'playerCount' ]
console.log(SoccerTeam.prototype) // sportsTeam {}
console.log(Object.getOwnPropertyNames(SoccerTeam.prototype)) // sportsTeam constructor, playerList, getPlayerStat
const fcEagles = new SoccerTeam('soccer', 'kim', 'seoul')
console.log(fcEagles) //   SoccerTeam { category: 'soccer', manager: 'kim', location: 'seoul' }
console.log(fcEagles.__proto__) // SportsTeam{}
// set
fcEagles.playerList = [
    { name: 'yu', score: 5, assist: 3 },
    { name: 'kim', score: 2, assist: 8 },
    { name: 'lee', score: 1, assist: 3 }
]
console.log(fcEagles.playerList) // get
console.log(fcEagles.getPlayersStat()) // method in child class
console.log(fcEagles.getPlayerCount()) // method in parent class
console.groupEnd()


