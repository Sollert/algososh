import {SHORT_DELAY_IN_MS} from "../constants/delays";
import {
  selectionSort,
  bubbleSort
} from "./algorithms";
import {DataElement} from "../types/types";

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