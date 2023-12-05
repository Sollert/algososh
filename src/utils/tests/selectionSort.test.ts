import {getSortSteps} from "../utils";
import {ElementStates} from "../../types/element-states";

describe("Тест сортировки выбором", () => {
  it("Тест пустого массива", () => {
    const input = getSortSteps(
      [],
      true,
      "выбор"
    )
    expect(input).toEqual([[]]);
  });

  it("Тест массива из одного элемента", () => {
    const input = getSortSteps([{
      value: 1,
      state: ElementStates.Default
    }], true, "выбор")

    const output = [
      [
        {value: 1, state: ElementStates.Modified}
      ]
    ];

    expect(input).toEqual(output);
  });

  it("Тест массива из нескольких элементов", () => {
    const input = getSortSteps(
      [
        {
          "value": 76,
          "state": ElementStates.Default
        },
        {
          "value": 24,
          "state": ElementStates.Default
        },
        {
          "value": 10,
          "state": ElementStates.Default
        }
      ],
      true,
      "выбор")

    const output = [
      [
        {
          "value": 76,
          "state": ElementStates.Changing
        },
        {
          "value": 24,
          "state": ElementStates.Changing
        },
        {
          "value": 10,
          "state": ElementStates.Default
        }
      ],
      [
        {
          "value": 76,
          "state": ElementStates.Changing
        },
        {
          "value": 24,
          "state": ElementStates.Default
        },
        {
          "value": 10,
          "state": ElementStates.Changing
        }
      ],
      [
        {
          "value": 10,
          "state": ElementStates.Modified
        },
        {
          "value": 24,
          "state": ElementStates.Changing
        },
        {
          "value": 76,
          "state": ElementStates.Changing
        }
      ],
      [
        {
          "value": 10,
          "state": ElementStates.Modified
        },
        {
          "value": 24,
          "state": ElementStates.Modified
        },
        {
          "value": 76,
          "state": ElementStates.Modified
        }
      ]
    ]

    expect(input).toEqual(output);
  })
})