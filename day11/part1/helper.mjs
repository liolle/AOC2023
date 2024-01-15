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

export const input_to_array = (input) => {
  const arr = input
    .trim()
    .split("\n")
    .map((row) => row.trim().split(""));

  return arr;
};

const point_map = (table) => {
  const set = new Set();

  const empty_set = new Set();
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[0].length; j++) {
      if (table[i][j] == "#") {
        set.add(`R${i}`);
        set.add(`C${j}`);
      }
    }
  }
  for (let i = 0; i < table.length; i++) {
    if (!set.has(`R${i}`)) empty_set.add(`R${i}`);
  }

  for (let i = 0; i < table[0].length; i++) {
    if (!set.has(`C${i}`)) empty_set.add(`C${i}`);
  }

  return empty_set;
};

export const transform_table = (table) => {
  const marks = point_map(table);
  const res_table = [];

  const col_num = Array.from(marks, (value) => value).filter((val) =>
    /C./.test(val)
  ).length;
  const empty_line = new Array(table[0].length + col_num).fill(".");
  for (let i = 0; i < table.length; i++) {
    const tmp_arr = [];
    if (marks.has(`R${i}`)) res_table.push(tmp_arr);
    for (let j = 0; j < table[0].length; j++) {
      if (marks.has(`C${j}`)) {
        tmp_arr.push(".");
      }
      tmp_arr.push(table[i][j]);
    }
    res_table.push(tmp_arr);
  }

  return res_table;
};

export const galaxies = (table) => {
  let res = [];
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[0].length; j++) {
      if (table[i][j] == "#") {
        res.push({
          row: i,
          col: j,
          distance: 0,
          path: [],
        });
      }
    }
  }
  return res;
};

export class BFS {
  constructor() {}

  static #regular_neighbor = (position, arr) => {
    const directions = [
      { row: 0, col: 1 },
      { row: 0, col: -1 },
      { row: 1, col: 0 },
      { row: -1, col: 0 },
    ];

    const res = [];
    for (const dir of directions) {
      const current_pos = {
        row: position.row + dir.row,
        col: position.col + dir.col,
        distance: position.distance + 1,
        path: [...position.path, `${position.row}-${position.col}`],
      };

      res.push(this.#adjust_pos(current_pos, arr));
    }
    return res;
  };

  static #adjust_pos = (position, arr) => {
    let adjusted = false;

    let new_row = position.row % arr.length;
    let new_col = position.col % arr[0].length;
    if (position.row >= arr.length || position.col >= arr[0].length) {
      adjusted = true;
    }

    if (new_row < 0) {
      new_row = arr.length - 1;
      adjusted = true;
    }
    if (new_col < 0) {
      new_col = arr[0].length - 1;
      adjusted = true;
    }

    if (adjusted) {
      return {
        row: new_row,
        col: new_col,
        adjusted: true,
        distance: position.distance,
        path: position.path,
      };
    }

    return {
      row: new_row,
      col: new_col,
      distance: position.distance,
      path: position.path,
    };
  };

  static walk(table, start) {
    const queue = new Queue();
    const visited = new Map();
    const visited_target = new Map();

    queue.enqueue(start);

    while (!queue.isEmpty()) {
      let position = queue.pop();
      visited.set(`${position.row}-${position.col}`, position);
      if (table[position.row][position.col] == "#") {
        console.log(`${position.row}-${position.col}`);
        visited_target.set(`${position.row}-${position.col}`, position);
      }

      const neighbors = this.#regular_neighbor(position, table);

      for (const pos of neighbors) {
        if (
          pos.adjusted == undefined &&
          !visited.has(`${pos.row}-${pos.col}`)
        ) {
          queue.enqueue(pos);
        }
      }
    }
    return visited_target;
  }
}

export const soft_scan = (table) => {
  const start_points = galaxies(table);
  const paths = [];

  while (start_points.length > 0) {
    const current_point = start_points.pop();
    for (const pos of start_points) {
      const distance =
        Math.abs(pos.row - current_point.row) +
        Math.abs(pos.col - current_point.col);
      paths.push({
        start: `${pos.row}-${pos.col}`,
        end: `${current_point.row}-${current_point.col}`,
        distance: distance,
      });
    }
  }

  return paths;
};

// !! this blows the memory
export const scan = (table) => {
  const start_points = galaxies(table);
  const paths = [];

  while (start_points.length > 0) {
    const current_point = start_points.pop();
    const shortest_path = BFS.walk(table, current_point);
    console.log(current_point);
    for (const pos of start_points) {
      const path_details = shortest_path.get(`${pos.row}-${pos.col}`);
      paths.push({
        start: `${pos.row}-${pos.col}`,
        end: path_details.path[0],
        distance: path_details.distance,
        path: path_details.path,
      });
    }
  }

  return paths;
};
