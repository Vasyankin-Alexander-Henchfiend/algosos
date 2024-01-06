type TStack<T> = {
  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  size(): number;
  clear(): number;
};

export class Stack<T> implements TStack<T> {
  storage: T[] = [];

  constructor(private capacity: number = Infinity) {}

  push(item: T) {
    if (this.size() === this.capacity) {
      throw Error("Stack has reached max capacity, you cannot add more items");
    }
    this.storage.push(item);
  }

  pop() {
    return this.storage.pop();
  }

  peek() {
    return this.storage[this.size() - 1];
  }

  size() {
    return this.storage.length;
  }

  clear() {
    return (this.storage.length = 0);
  }
}
