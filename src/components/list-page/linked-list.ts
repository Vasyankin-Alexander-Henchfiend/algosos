class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | undefined = undefined;

  constructor(value: T, next: LinkedListNode<T> | undefined = undefined) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList<T> {
  head: LinkedListNode<T> | undefined = undefined;
  tail: LinkedListNode<T> | undefined = undefined;
  constructor() {
    this.head = undefined;
    this.tail = undefined;
  }

  prepend(value: T) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    return this;
  }

  append(value: T) {
    const newNode = new LinkedListNode(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  delete(value: T) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    while (this.head && this.head.value === value) {
      deletedNode = this.head;

      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== undefined) {
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.tail && this.tail.value === value) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  deleteTail() {
    if (!this.tail || !this.head) {
      return null;
    }

    const deletedTail = this.tail;

    if (this.head === this.tail) {
      this.head = undefined;
      this.tail = undefined;

      return deletedTail;
    }

    let currentNode = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = undefined;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = undefined;
      this.tail = undefined;
    }

    return deletedHead;
  }

  getHead() {
    return this.head?.value;
  }

  getTail() {
    return this.tail?.value;
  }

  toArray(): Array<T> {
    const nodes: Array<T> = [];

    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  getByIndex(index: number | undefined) {
    let counter = 0;

    if (index !== undefined) {
      if (index >= this.toArray().length || index < 0) {
        return null;
      }

      let current = this.head;

      while (counter < index) {
        if (current) {
          current = current.next;
          counter++;
        }
      }
      return current;
    }
  }

  addByIndex(index: number | undefined, value: T) {
    if (index === 0) {
      this.prepend(value);
    }

    if (index !== undefined) {
      if (index > this.toArray().length || index < 0) {
        return null;
      }

      const prevNode = this.getByIndex(index - 1);
      const nextNode = this.getByIndex(index);

      if (prevNode && nextNode) {
        prevNode.next = new LinkedListNode(value, nextNode);
      }
    }
    return this;
  }

  deleteByIndex(index: number | undefined) {
    if (index === 0) {
      this.deleteHead();
    }

    if (index === this.toArray().length - 1 && index !== 0) {
      this.deleteTail();
    }

    if (index !== undefined) {
      if (index > this.toArray().length || index < 0) {
        return null;
      }

      const prevNode = this.getByIndex(index - 1);
      const nextNode = this.getByIndex(index + 1);

      if (prevNode && nextNode) {
        prevNode.next = nextNode;
      }
    }
    return this;
  }
}
