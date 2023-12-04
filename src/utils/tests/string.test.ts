import {getReversingStringSteps} from "../utils";

describe('Тест алгоритма разворота строки', () => {
  it('Тест с чётным количеством символов', () => {
    const res = getReversingStringSteps('1234');
    expect(res).toEqual([
      ["1", "2", "3", "4"],
      ["4", "2", "3", "1"],
      ["4", "3", "2", "1"]
    ]);
  })
  it('Тест с нечётным количеством символов', () => {
    const res = getReversingStringSteps("123");
    expect(res).toEqual([
      ["1", "2", "3"],
      ["3", "2", "1"],
      ["3", "2", "1"]
    ])
  })
  it('Тест с одним символом', () => {
    const res = getReversingStringSteps("1");
    expect(res).toEqual([
      ["1"],
      ["1"]
    ]);
  })
  it('Тест с пустой строкой', () => {
    const res = getReversingStringSteps("");
    expect(res).toEqual(null)
  })
})
