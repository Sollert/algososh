import {getSortSteps} from "../utils";
import {ElementStates} from "../../types/element-states";

describe('Тест алгоритма сортировки пузырьком', () => {
  it('Тест пустого массива', () => {
    const input = getSortSteps(
      [],
      true,
      "пузырёк"
    );

    expect(input).toEqual([]);
  });

  it('Тест массива из одного элемента', () => {
    const input = getSortSteps([{
      value: 1,
      state: ElementStates.Default
    }], true, "пузырёк")

    const output = [[{value: 1, state: ElementStates.Modified}]];

    expect(input).toEqual(output);
  });

  it('Тест массива из нескольких элементов', () => {
    const input = getSortSteps(
        [
        {value: 51, state: ElementStates.Default},
        {value: 63, state: ElementStates.Default},
        {value: 30, state: ElementStates.Default}
      ],
      true,
      "пузырёк"
    )

    const output = [
      [
        {value: 51, state: ElementStates.Changing},
        {value: 63, state: ElementStates.Changing},
        {value: 30, state: ElementStates.Default}
      ],
      [
        {value: 51, state: ElementStates.Default},
        {value: 63, state: ElementStates.Changing},
        {value: 30, state: ElementStates.Changing}
      ],
      [
        {value: 51, state: ElementStates.Default},
        {value: 30, state: ElementStates.Changing},
        {value: 63, state: ElementStates.Changing}
      ],
      [
        {value: 51, state: ElementStates.Default},
        {value: 30, state: ElementStates.Default},
        {value: 63, state: ElementStates.Modified}
      ],
      [
        {value: 51, state: ElementStates.Changing},
        {value: 30, state: ElementStates.Changing},
        {value: 63, state: ElementStates.Modified}
      ],
      [
        {value: 30, state: ElementStates.Changing},
        {value: 51, state: ElementStates.Changing},
        {value: 63, state: ElementStates.Modified}
      ],
      [
        {value: 30, state: ElementStates.Default},
        {value: 51, state: ElementStates.Modified},
        {value: 63, state: ElementStates.Modified}
      ],
      [
        {value: 30, state: ElementStates.Modified},
        {value: 51, state: ElementStates.Modified},
        {value: 63, state: ElementStates.Modified}
      ]
    ]

    expect(input).toEqual(output);

  })

});