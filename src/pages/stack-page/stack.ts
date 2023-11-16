import {DataElement} from "../../types/types";

interface IStack<T> {
  push: (item: T) => void; // добавление элемента в стек
  pop: () => void; // удаление верхнего элемента стека
  peek: () => T | null; // получение верхнего элемента стека
  clear: () => void; // очистка стека
}

export class Stack<T> implements IStack<T> {
  private container: (T | null)[] = [];

  // получить размер стека
  getSize = () => this.container.length;

  // получить все элементы стека
  getElements = () => this.container;

  // проверить пуст ли стек
  isEmpty = () => this.container.length === 0;

  // добавить элемент
  push = (item: T) => this.container.push(item);

  // удалить верхний элемент
  pop = () => {
    if (this.container.length > 0) {
      return this.container.pop();
    }
  };

  // получить верхний элемент
  peek = () => this.container[this.container.length - 1];

  // очистить стек
  clear = () => (this.container = []);
}

export const stack = new Stack<DataElement>();