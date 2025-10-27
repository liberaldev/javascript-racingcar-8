import { MissionUtils } from '@woowacourse/mission-utils';
import App from '../src/App.js';
import Cars from '../src/Cars.js';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => acc.mockReturnValueOnce(number), MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('자동차 경주', () => {
  const MOVING_FORWARD = 4;
  const STOP = 3;

  test('기능 테스트', async () => {
    // given
    const inputs = ['pobi,woni', '1'];
    const logs = ['pobi : -', 'woni : ', '최종 우승자 : pobi'];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test.each([
    ['pobi,javaji'],
    ['pobi,'],
    ['pobi, '],
    [','],
    [''],
  ])('예외 테스트 (입력값: "%s")', async (inputs) => {
    // given
    mockQuestions([inputs]);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });

  test('moveCarsByRandomNumber 메소드 테스트', () => {
    const CARS = new Cars(['pobi', 'woni', 'soso', 'jisu']);
    mockRandoms([MOVING_FORWARD, STOP, STOP, MOVING_FORWARD]);

    CARS.moveCarsByRandomNumber();
    expect(CARS.getCars()).toEqual([
      { name: 'pobi', steps: 1 },
      { name: 'woni', steps: 0 },
      { name: 'soso', steps: 0 },
      { name: 'jisu', steps: 1 },
    ]);
  });

  test('sort 메소드 테스트', () => {
    const CARS = new Cars(['pobi', 'woni', 'soso', 'jisu']);
    mockRandoms([MOVING_FORWARD, STOP, STOP, MOVING_FORWARD]);

    CARS.moveCarsByRandomNumber();
    CARS.sort();

    expect(CARS.getCars()).toEqual([
      { name: 'pobi', steps: 1 },
      { name: 'jisu', steps: 1 },
      { name: 'woni', steps: 0 },
      { name: 'soso', steps: 0 },
    ]);
  });
});
