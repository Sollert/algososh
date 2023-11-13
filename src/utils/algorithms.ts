import {SortingElement} from "../types/sortingTypes";
import {ElementStates} from "../types/element-states";
import {swap} from "./utils";


// Сортировка выбором
export const selectionSort = (
  arr: (SortingElement | null)[],
  steps: (SortingElement | null)[][],
  isAscending: boolean
) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let indToSwap = i;
    arr[i] = {...arr[i], state: ElementStates.Changing} as SortingElement;

    for (let j = i + 1; j < arr.length; j++) {
      arr[j] = {...arr[j], state: ElementStates.Changing,} as SortingElement;
      steps.push([...arr]);

      if ((isAscending && arr[j]!.value < arr[indToSwap]!.value) ||
        (!isAscending && arr[j]!.value > arr[indToSwap]!.value))
      {
        indToSwap = j;
      }

      arr[j] = {...arr[j], state: ElementStates.Default,} as SortingElement;
    }

    arr[i] = {...arr[i], state: ElementStates.Default} as SortingElement;
    swap(arr, i, indToSwap);
    arr[i] = {...arr[i], state: ElementStates.Modified} as SortingElement;
  }

  arr[arr.length - 1] = {...arr[arr.length - 1], state: ElementStates.Modified} as SortingElement;
  steps.push([...arr]);
}

// Сортировка пузыриком
export const bubbleSort = (
  arr: (SortingElement | null)[],
  steps: (SortingElement | null)[][],
  isAscending: boolean
) => {

  for (let i = 0; i < arr.length; i++) {

    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j] = {...arr[j], state: ElementStates.Changing} as SortingElement;
      arr[j + 1] = {...arr[j + 1], state: ElementStates.Changing} as SortingElement;
      steps.push([...arr]);

      if ((isAscending && arr[j]!.value > arr[j + 1]!.value) ||
        (!isAscending && arr[j]!.value < arr[j + 1]!.value))
      {
        swap(arr, j, j + 1);
        steps.push([...arr]);
      }

      arr[j] = {...arr[j], state: ElementStates.Default} as SortingElement;
      arr[j + 1] = {...arr[j + 1], state: ElementStates.Default,} as SortingElement;
    }

    arr[arr.length - i - 1] = {...arr[arr.length - i - 1], state: ElementStates.Modified,} as SortingElement;
    arr[arr.length - 1] = {...arr[arr.length - 1], state: ElementStates.Modified,} as SortingElement;
    steps.push([...arr]);
  }

}