// Before capssule
class Pharmacist {
  private medicine1 = "for covid";
  private medicine2 = "no pill";
  private medicine3 = "for new covid";

  greetToClinet() {
    return `약국입니다. 어서오세요.`;
  }
  examineClient(condition: string) {
    if (condition === "very hard") {
      return "new covid";
    } else if (condition === "hard") {
      return "covid";
    } else {
      return "no covid";
    }
  }
  makePill(disease: string) {
    if (disease === "new covid") {
      return this.medicine3;
    } else if (disease === "covid") {
      return this.medicine1;
    } else {
      return this.medicine2;
    }
  }
  givePillToClient(pill: string) {
    if (pill === this.medicine1) {
      return `${this.medicine1} 복용법입니다.`;
    } else if (pill === this.medicine2) {
      return `${this.medicine2}. 쉬세요`;
    } else {
      return `${this.medicine3} 복용법입니다.`;
    }
  }
}

class Patient {
  private name: string;
  private condition: string;
  disease = "?";
  constructor(name: string, condition: string) {
    this.name = name;
    this.condition = condition;
  }

  goToPharmacy() {
    const pharmacy = new Pharmacist();
    pharmacy.greetToClinet();
    this.disease = pharmacy.examineClient(this.condition);
    const pill = pharmacy.makePill(this.disease);
    return pharmacy.givePillToClient(pill);
  }
}

const patient = new Patient("yu", "hard");
console.log(patient.goToPharmacy()); // for covid 복용법입니다.
// After Capsule

class Pharmacist2 {
  private medicine1 = "for covid";
  private medicine2 = "no pill";
  private medicine3 = "for new covid";

  private greetToClinet() {
    return `약국입니다. 어서오세요.`;
  }
  private examineClient(condition: string) {
    if (condition === "very hard") {
      return "new covid";
    } else if (condition === "hard") {
      return "covid";
    } else {
      return "no covid";
    }
  }
  private makePill(disease: string) {
    if (disease === "new covid") {
      return this.medicine3;
    } else if (disease === "covid") {
      return this.medicine1;
    } else {
      return this.medicine2;
    }
  }
  private givePillToClient(pill: string) {
    if (pill === this.medicine1) {
      return `${this.medicine1} 복용법입니다.`;
    } else if (pill === this.medicine2) {
      return `${this.medicine2}. 쉬세요`;
    } else {
      return `${this.medicine3} 복용법입니다.`;
    }
  }

  operate(condition: string) {
    this.greetToClinet();
    return this.givePillToClient(this.makePill(this.examineClient(condition)));
  }
}

class Patient2 {
  private name: string;
  private condition: string;
  disease = "?";
  constructor(name: string, condition: string) {
    this.name = name;
    this.condition = condition;
  }

  goToPharmacy() {
    const pharmacy = new Pharmacist2();
    return pharmacy.operate(this.condition);
  }
}

const patient2 = new Patient("yu", "hard");
console.log(patient.goToPharmacy()); // for covid 복용법입니다.
