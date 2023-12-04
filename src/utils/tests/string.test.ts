import {getReversingStringSteps} from "../utils";

describe('Тест алгоритма разворота строки', () => {
  it('Тест с чётным количеством символов', () => {
    expect(getReversingStringSteps('1234')).toEqual([
      ["1", "2", "3", "4"],
      ["4", "2", "3", "1"],
      ["4", "3", "2", "1"]
    ]);
  })
  it('Тест с нечётным количеством символов', () => {
    expect(getReversingStringSteps("123")).toEqual([
      ["1", "2", "3"],
      ["3", "2", "1"],
      ["3", "2", "1"]
    ])
  })
  it('Тест с одним символом', () => {
    expect(getReversingStringSteps("1")).toEqual([
      ["1"],
      ["1"]
    ]);
  })
  it('Тест с пустой строкой', () => {
    expect(getReversingStringSteps("")).toEqual(null)
  })
})
