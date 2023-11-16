import {DataElement} from "../../types/types";
import {QUEUE_MAX_LENGTH} from "../../constants/numbers";

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peek: () => T | null;
  clear: () => void;
}

// класс, реализующий интерфейс
class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  isEmpty = () => this.length === 0;

  // Получить последний элемент
  getTailElement() {
    if (!this.isEmpty()) {
      return {
        index: this.tail - 1,
        value: this.container[this.tail - 1],
      };
    }
    return null;
  }

  // Получить первый элемент
  getHeadElement() {
    if (!this.isEmpty()) {
      return {
        index: this.head,
        value: this.container[this.head],
      };
    }
    return null;
  }

  // Получить длинну
  getSize = () => this.length;

  // Получить все элементы
  getElements = () => this.container;

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error('Превышено максимальное количество длины');
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error('В очереди нет элементов');
    }
    this.container[this.head] = null;
    this.head++;
    this.length--;
  };

  peek = (): T | null => {
    if (this.isEmpty()) {
      throw new Error('В очереди нет элементов');
    }
    return this.container[this.head];
  };

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = Array(this.size);
  };
}

export const queue = new Queue<DataElement>(QUEUE_MAX_LENGTH);