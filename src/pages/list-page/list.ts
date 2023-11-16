export class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;

  constructor(initArray?: T[]) {
    this.head = null;
    this.size = 0;
    initArray?.forEach((node) => this.append(node));
  }

  // Проверить пуст ли список
  isEmpty = () => this.size === 0;

  // Получить размер
  getSize = () => this.size;

  // Добавить элемент в конец
  append(element: T) {
    const node = new Node(element);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current?.next) {
        current = current.next;
      }
      if (current) {
        current.next = new Node(element);
      }
    }
    this.size++;
  }

  // Добавить элемент в начало
  prepend(element: T) {
    const node = new Node(element);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  // Добавить элемент по индексу
  addAtIndex(position: number, value: T) {
    if (position < 0 || position > this.size) {
      throw new Error('Неправильное значение индекса');
    }
    const node = new Node(value);
    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let current = this.head;
      let prev = null;
      let index = 0;
      while (index < position) {
        prev = current;
        current = current ? current.next : null;
        index++;
      }
      if (prev) {
        prev.next = node;
      }
      node.next = current;
    }
    this.size++;
  }

  // Удалить элмент по индексу
  deleteAtIndex(position: number) {
    if (position < 0 || position > this.size) {
      throw new Error('Неправильное значение индекса');
    }
    let current = this.head;
    if (position === 0 && current) {
      this.head = current.next;
    } else {
      let prev = null;
      let index = 0;
      while (index < position) {
        prev = current;
        current = current ? current.next : null;
        index++;
      }
      if (prev && current) {
        prev.next = current.next;
      }
    }
    this.size--;
    return current ? current.value : null;
  }

  // Получить элемент
  getAtIndex(position: number) {
    if (position < 0 || position > this.size) {
      throw new Error('Неправильное значение индекса');
    }
    let current = this.head;
    let index = 0;
    while (index < position) {
      current = current ? current.next : null;
      index++;
    }
    return current ? current.value : null;
  }

  // Удалить head
  deleteHead = () => {
    let temp = this.head;
    if (temp) {
      this.head = temp.next;
      this.size--;
      return;
    }
  };

  // Удалить tail
  deleteTail = () => {
    if (!this.head || !this.head.next) {
      return null;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = null;
    this.size--;
    return current ? current.value : null;
  };

  // Преобразовать в массив
  toArray = () => {
    const array = [];
    let current = this.head;
    while (current) {
      array.push(current.value);
      current = current.next;
    }
    return array;
  };
}