type TQueue<T> = {
  enqueue(item: T): void;
  dequeue: () => void;
  size(): number;
  clear: () => void;
};

export class Queue<T> implements TQueue<T> {
  storage: (T | null)[] = [];
  private readonly queueSize: number = 0;
  private head: number = 0;
  private tail: number = 0;

  constructor(size: number) {
    this.queueSize = size;
    this.storage = Array(size).fill(null);
  }
  isFull = () => this.tail === this.queueSize - 1;

  enqueue(item: T): void {
    if (this.isFull()) {
      throw Error("Queue has reached max capacity, you cannot add more items");
    }
    if (this.storage[0] === null && this.tail === 0) {
      this.storage[0] = item;
    } else {
      this.tail++;
      this.storage[this.tail] = item;
    }
  }

  dequeue() {
    this.storage[this.head] = null;
    this.head++;
    if (this.head === this.size()) {
      this.head = this.size() - 1;
    }
  }

  getTail = (): number => {
    return this.tail;
  };

  getHead = (): number => {
    return this.head;
  };

  size(): number {
    return this.storage.length;
  }

  clear() {
    this.storage.fill(null);
    this.head = 0;
    this.tail = 0;
  }
}
