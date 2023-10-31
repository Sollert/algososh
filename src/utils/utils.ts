import {DELAY_IN_MS} from "../constants/delays";

export const swap = <T>(array: T[], firstIndex: number, secondIndex: number) => {
  const temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
}

export const delay = async () => {
  return new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS))
}