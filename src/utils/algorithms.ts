import {ElementStates} from "../types/element-states";
import {swap} from "./utils";
import {DataElement} from "../types/types";

// Сортировка выбором
export const selectionSort = (
  arr: (DataElement | null)[],
  steps: (DataElement | null)[][],
  isAscending: boolean
) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let indToSwap = i;
    arr[i] = {...arr[i], state: ElementStates.Changing} as DataElement;

    for (let j = i + 1; j < arr.length; j++) {
      arr[j] = {...arr[j], state: ElementStates.Changing,} as DataElement;
      steps.push([...arr]);

      if ((isAscending && arr[j]!.value < arr[indToSwap]!.value) ||
        (!isAscending && arr[j]!.value > arr[indToSwap]!.value))
      {
        indToSwap = j;
      }

      arr[j] = {...arr[j], state: ElementStates.Default,} as DataElement;
    }

    arr[i] = {...arr[i], state: ElementStates.Default} as DataElement;
    swap(arr, i, indToSwap);
    arr[i] = {...arr[i], state: ElementStates.Modified} as DataElement;
  }

  arr[arr.length - 1] = {...arr[arr.length - 1], state: ElementStates.Modified} as DataElement;
  steps.push([...arr]);
}

// Сортировка пузыриком
export const bubbleSort = (
  arr: (DataElement | null)[],
  steps: (DataElement | null)[][],
  isAscending: boolean
) => {

  for (let i = 0; i < arr.length; i++) {

    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j] = {...arr[j], state: ElementStates.Changing} as DataElement;
      arr[j + 1] = {...arr[j + 1], state: ElementStates.Changing} as DataElement;
      steps.push([...arr]);

      if ((isAscending && arr[j]!.value > arr[j + 1]!.value) ||
        (!isAscending && arr[j]!.value < arr[j + 1]!.value))
      {
        swap(arr, j, j + 1);
        steps.push([...arr]);
      }

      arr[j] = {...arr[j], state: ElementStates.Default} as DataElement;
      arr[j + 1] = {...arr[j + 1], state: ElementStates.Default,} as DataElement;
    }

    arr[arr.length - i - 1] = {...arr[arr.length - i - 1], state: ElementStates.Modified,} as DataElement;
    arr[arr.length - 1] = {...arr[arr.length - 1], state: ElementStates.Modified,} as DataElement;
    steps.push([...arr]);
  }

}