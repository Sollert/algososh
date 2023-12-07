import {SHORT_DELAY_IN_MS} from "../constants/delays";
import {
  selectionSort,
  bubbleSort
} from "./algorithms";
import {DataElement} from "../types/types";
import {ElementStates} from "../types/element-states";

export const swap = <T>(array: T[], firstIndex: number, secondIndex: number) => {
  const temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
}

export const delay = async () => {
  return new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS))
}

export const getRandomNumber = (min: number, max: number) => {
  return Math.random() * ((max - min + 1)) + min;
}

export const getSortSteps = (
  arrToSort: (DataElement | null)[],
  isAscending: boolean,
  sortAlgorithm: string | null
) => {

  const arr = arrToSort;
  const steps: (DataElement | null)[][] = [];

  if (sortAlgorithm === 'выбор') {
    selectionSort(arr, steps, isAscending)
  }

  if (sortAlgorithm === 'пузырёк') {
    bubbleSort(arr, steps, isAscending)
  }

  return steps
}

export const getReversingStringSteps = (str: string): string[][] | null => {
  if (!str) return null;

  const arr = str.split('');
  const result: string[][] = [[...arr]];

  let start = 0,
    end = arr.length - 1;

  while (start <= end) {
    swap(arr, start, end);
    result.push([...arr]);
    start++;
    end--;
  }

  return result;
};

export const getLetterState = (
  index: number,
  step: number,
  len: number
): ElementStates | undefined => {
  if (index < step || index > len - 1 - step) return ElementStates.Modified;
  if (index === step || index === len - 1 - step) return ElementStates.Changing;
  if (index > step && index < len - 1 - step) return ElementStates.Default;
};

export const getFibonacciSteps = (num: number) : number[][] => {
  const steps = [];

  let a = 1;
  let b = 0;
  let temp;
  const tempSequence = [];

  while (num >= 0) {
    temp = a;
    a += b;
    b = temp;
    tempSequence.push(b);

    steps.push([...tempSequence])

    num -= 1;
  }

  return steps
}