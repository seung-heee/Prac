// 데이터 타입 명시
let stdId : number = 1;
let stdName : string = '승희';
let age : number = 24;
let gender : string = 'female';
let course : string = 'TypeScript';
let completed : boolean = false;

// 열거형 : 사용자 정의 타입
enum GenderType {
  Male,
  Female
}

// 인터페이스
interface Student { 
  stdId : number;
  stdName? : string; // ? : 선택적 프로퍼티
  age? : number;
  gender? : GenderType;
  course? : string;
  completed? : boolean;
  setName : (name : string) => void; // 메서드 선언
}

class MyStudent implements Student { // student의 인터페이스를 상속하겠다.(구현하겠다.)
  stdId = 1192;
  stdName = 'heee';
  age = 24;
  gender = GenderType.Male;
  course = 'javascript';
  completed = false;
  // 오버라이딩 해줘야함.
  setName(name : string) : void {
    this.stdName = name;
    console.log('이름 설정 : ' + this.stdName);
  }
}

const myInstance = new MyStudent();
myInstance.setName('승희');

// 학생 정보 구하기
function getInfo(id : number) : Student {
  return {
    stdId : id,
    stdName : 'seunghee',
    // age : 22,
    gender : GenderType.Male,
    course : 'TypeScript',
    completed : false,
  }
};

// 학생 정보 수정하기
function setInfo(student : Student) : void {
  console.log('setInfo : ' ,student)
}

let std = {
  stdId : 1192,
  stdName : 'heee',
  age : 24,
  gender : GenderType.Male,
  course : 'javascript',
  completed : false,
}

// setInfo(std)
// console.log(getInfo(5678));