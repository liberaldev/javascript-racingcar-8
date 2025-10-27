import { MissionUtils } from '@woowacourse/mission-utils';
import Cars from './Cars';

class App {
  async run() {
    const CAR_NAMES_STR = await MissionUtils.Console.readLineAsync('경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n');
    const RACE_COUNT = await MissionUtils.Console.readLineAsync('시도할 횟수는 몇 회인가요?\n');
    const CARS = new Cars(CAR_NAMES_STR.split(','));
  }
}

export default App;
