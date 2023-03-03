// OOP 특징 예제
// 1. 추상화와 상속
// 대상 추상화
interface Managable {
  getPlayers(): string[];
  createPlayers(player: string): void;
  getManager(): string;
}

abstract class SportsTeam implements Managable {
  protected manager: string;
  protected players: string[] = [];
  protected name: string;
  protected abstract subject: string;
  constructor(name: string, manager: string) {
    this.manager = manager;
    this.name = name;
  }

  createPlayers(player: string) {
    this.players.push(player);
  }
  abstract getPlayers(): string[];
  abstract getManager(): string;
  abstract getTeamIntroduction(): string;
}

// 추상화를 기반으로 객체 생성자 구현
class BaseballTeam extends SportsTeam {
  subject: string = "baseball";
  constructor(name: string, manager: string) {
    super(name, manager);
  }

  getPlayers() {
    return this.players;
  }

  getManager(): string {
    return this.manager;
  }

  createPlayers(player: string) {
    this.players.push(player);
    return "create player success";
  }

  getTeamIntroduction(): string {
    return `${this.name} play ${this.subject} we need pitcher`;
  }
}

// 추상화를 기반으로 객체 생성자 구현
class SoccerTeam extends SportsTeam implements Managable {
  subject = "soccer";
  constructor(name: string, manager: string) {
    super(name, manager);
  }

  getPlayers() {
    return this.players;
  }

  getManager(): string {
    return this.manager;
  }

  createPlayers(player: string) {
    this.players.push(player);
    return "create player success";
  }

  getTeamIntroduction(): string {
    return `${this.name} play ${this.subject}. Join the best soccer team`;
  }
}

// 2. 다형성
class Player {
  private name: string;
  private clubList: SportsTeam[] = [];
  constructor(name: string) {
    this.name = name;
  }
  playWhichSubject(SportsTeam: SportsTeam) {
    return SportsTeam.getTeamIntroduction();
  }
  joinSportsTeam(SportsTeam: SportsTeam) {
    this.clubList.push(SportsTeam);
    SportsTeam.createPlayers(this.name);
  }
  getBelongedTeams() {
    return this.clubList;
  }
}

const eagles = new BaseballTeam("eagles", "yu hyeonjun");
const liverpool = new SoccerTeam("soccer", "klopp");
const user = new Player("yu");

// 다형성을 이용한 코드 재사용
user.joinSportsTeam(eagles);
user.joinSportsTeam(liverpool);

const clubList = user.getBelongedTeams();
for (let i = 0; i < clubList.length; i++) {
  console.log("소속 팀과 종목 조회", clubList[i].getTeamIntroduction()); // 소속 팀과 종목 조회 eagles play baseball | 소속 팀과 종목 조회 soccer play soccer
}
