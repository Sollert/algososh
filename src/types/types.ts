import {ElementStates} from "./element-states";

export type DataElement = {
  value: string | number;
  state: ElementStates;
  isHead?: boolean;
}