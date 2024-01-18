/**
 * value
 * next
 */

class Queue {
  constructor() {
    this.size = 0;
  }

  // O(1)
  enqueue(element) {
    const new_node = {
      value: element,
      next: null,
      prev: null,
    };

    if (this.isEmpty()) {
      this.first = new_node;
      this.last = new_node;
    } else {
      new_node.next = this.first;
      this.first.prev = new_node;
      this.first = new_node;
    }
    this.size++;
  }

  /**
   *Remove element LIFO => O(1)
   * @returns any
   */
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    const res = this.first;
    this.first = this.first.next;
    if (this.first) this.first.prev = null;
    this.size--;
    return res.value;
  }

  // O(1)
  // remove last
  /**
   * Remove element FIFO => O(1)
   * @returns any
   */
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    const res = this.last;
    this.last = this.last.prev;
    if (this.last) this.last.next = null;
    this.size--;
    return res.value;
  }

  // O(1)
  /**
   *
   * @returns boolean
   */
  isEmpty() {
    return this.size == 0;
  }

  /**
   *
   * @returns any[]
   */
  toArray() {
    let current = this.first;

    let arr = [];
    while (current) {
      arr.push(current.value);
      current = current.next;
    }

    return arr;
  }

  /**
   *
   * @returns string
   */
  toString() {
    let current = this.first;

    let str = "";
    while (current) {
      str += current.value + " ";
      current = current.next;
    }

    return str;
  }
}

export class BFS {
  constructor() {}

  /**
   *
   * @param {string} state
   * @returns
   */
  static regular_neighbor = (state) => {
    const splitted_state = state.split("");
    const res = [];

    for (let i = 0; i < splitted_state.length; i++) {
      if (splitted_state[i] == "?") {
        let new_state = [...splitted_state];
        new_state[i] = "#";
        res.push(new_state.join(""));
      }
    }

    return res;
  };

  static isValidState(state, constraint) {
    const symbol_count = state.split("").reduce((acc, current) => {
      if (current == "#") return acc + 1;
      return acc;
    }, 0);

    const max_symbol = constraint.reduce((acc, current) => acc + current, 0);

    return symbol_count <= max_symbol;
  }

  static isExactCount(state, constraint) {
    const symbol_count = state.split("").reduce((acc, current) => {
      if (current == "#") return acc + 1;
      return acc;
    }, 0);

    const max_symbol = constraint.reduce((acc, current) => acc + current, 0);

    return symbol_count == max_symbol;
  }

  static isCorrectState(state, constraint) {
    let patternHead = "^[?.]*";
    let pattern = "";
    let patternTail = "[?.]*$";

    for (const c of constraint) {
      if (pattern != "") pattern += "[.?]+";
      pattern += `[#]{${c}}`;
    }

    return new RegExp(patternHead + pattern + patternTail).test(state);
  }

  static walk(start, constraint) {
    const queue = new Queue();
    const visited = new Set();
    const visited_target = new Set();

    queue.enqueue(start);

    while (!queue.isEmpty()) {
      let state = queue.dequeue();
      visited.add(state);
      if (this.isCorrectState(state, constraint)) {
        visited_target.add(state);
        continue;
      }

      const neighbors = this.regular_neighbor(state);

      for (const st of neighbors) {
        if (!visited.has(st) && this.isValidState(st, constraint)) {
          queue.enqueue(st);
        }
      }
    }
    return visited_target;
  }
}
