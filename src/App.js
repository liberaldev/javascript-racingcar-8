import { MissionUtils } from '@woowacourse/mission-utils';
import Cars from './Cars.js';

class App {
  constructor() {
    this.winners = [];
  }

  selectWinner(cars) {
    cars.sort();
    const CARS_DATA = cars.cars;
    for (let i = 0; i < CARS_DATA.length; i += 1) {
      if (i === 0) {
        this.winners.push(CARS_DATA[i].name);
      } else if (CARS_DATA[i].steps === CARS_DATA[i - 1].steps) {
        this.winners.push(CARS_DATA[i].name);
      } else {
        break;
      }
    }
  }

  async run() {
    const CAR_NAMES_STR = await MissionUtils.Console.readLineAsync('경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n');
    const TRY_COUNT = await MissionUtils.Console.readLineAsync('시도할 횟수는 몇 회인가요?\n');
    const CARS = new Cars(CAR_NAMES_STR.split(','));

    MissionUtils.Console.print('\n실행 결과');
    for (let i = 0; i < TRY_COUNT; i += 1) {
      CARS.moveCarsByRandomNumber();
      CARS.carsStepsPrint();
      MissionUtils.Console.print('');
    }

    this.selectWinner(CARS);
  }
}

export default App;
