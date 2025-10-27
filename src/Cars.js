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
}

export default Cars;
