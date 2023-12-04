import {getFibonacciSteps, getReversingStringSteps} from "../utils";

describe('Тест алгоритма генерации чисел Фибоначчи', () => {
  it('Тест с положительным числом', () => {
    const res = getFibonacciSteps(2);
    expect(res).toEqual([
      [1],
      [1, 1],
      [1, 1, 2]
    ]);
  });
  it('Тест с отричательным числом', () => {
    const res = getFibonacciSteps(-1);
    expect(res).toEqual([]);
  });
})