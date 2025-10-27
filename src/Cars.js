import { MissionUtils } from '@woowacourse/mission-utils/src';

class Cars {
  static #validateCarNames(carNames) {
    carNames.forEach((name) => {
      if (!name || name.trim() === '') {
        throw new Error('[ERROR] 차 이름은 비어있을 수 없습니다.');
      }
      if (name.length > 5) {
        throw new Error('[ERROR] 차 이름은 5자 이하여야 합니다.');
      }
    });
  }

  constructor(carNames) {
    Cars.#validateCarNames(carNames);
    this.cars = [];
    carNames.forEach((name) => {
      this.cars.push({ name, steps: 0 });
    });
  }

  moveCarsByRandomNumber() {
    for (let i = 0; i < this.cars.length; i += 1) {
      if (MissionUtils.Random.pickNumberInRange(0, 9) >= 4) {
        this.cars[i].steps += 1;
      }
    }
  }

  sort() {
    this.cars.sort((a, b) => b.steps - a.steps);
  }

  carsStepsPrint() {
    this.cars.forEach((car) => {
      MissionUtils.Console.print(`${car.name} : ${'-'.repeat(car.steps)}`);
    });
  }
}

export default Cars;
