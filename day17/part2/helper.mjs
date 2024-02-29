export function extractTable(fileContent) {
  const lines = fileContent.split("\n").map((val) => val.trim());
  const tables = [];
  for (const line of lines) {
    tables.push(line.split(""));
  }
  return tables;
}

const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

export class PriorityQueue {
  #heap;
  #isGreater;

  constructor(comparator) {
    this.#heap = [];
    this.#isGreater = (a, b) => comparator(this.#heap[a], this.#heap[b]) > 0;
  }

  get size() {
    return this.#heap.length;
  }

  peek() {
    return this.#heap[0];
  }

  add(value) {
    this.#heap.push(value);
    this.#siftUp();
  }

  poll(heap = this.#heap, value = heap[0], length = heap.length) {
    if (length) {
      swap(heap, 0, length - 1);
    }

    heap.pop();
    this.#siftDown();

    return value;
  }

  #siftUp(node = this.size - 1, parent = ((node + 1) >>> 1) - 1) {
    for (
      ;
      node && this.#isGreater(node, parent);
      node = parent, parent = ((node + 1) >>> 1) - 1
    ) {
      swap(this.#heap, node, parent);
    }
  }

  #siftDown(size = this.size, node = 0, isGreater = this.#isGreater) {
    while (true) {
      const leftNode = (node << 1) + 1;
      const rightNode = leftNode + 1;

      if (
        (leftNode >= size || isGreater(node, leftNode)) &&
        (rightNode >= size || isGreater(node, rightNode))
      ) {
        break;
      }

      const maxChild =
        rightNode < size && isGreater(rightNode, leftNode)
          ? rightNode
          : leftNode;

      swap(this.#heap, node, maxChild);

      node = maxChild;
    }
  }

  toArray() {
    return this.#heap;
  }
}

/**
 * @param {string[][]} table
 * @param {{row:string,col:string,direction:"north"|"east"|"south"|"west",count:number,heat:number}} node
 * @returns {boolean}
 */
function isInbound(table, node) {
  return (
    node.row >= 0 &&
    node.row < table.length &&
    node.col >= 0 &&
    node.col < table[0].length
  );
}
/**
 * @param { string[][]} table
 * @param {{row:string,col:string,direction:"north"|"east"|"south"|"west",count:number,heat:number}} node
 * @param {"north"|"east"|"south"|"west"} direction
 * @returns {{row:string,col:string,direction:"north"|"east"|"south"|"west",count:number,heat:number}|null}
 */
function getNextNode(table, node, direction) {
  let new_pos = {
    row: node.row,
    col: node.col,
    direction: direction,
    count: node.direction == direction ? node.count + 1 : 1,
    heat: node.heat,
    path: [...node.path],
  };
  switch (direction) {
    case "north":
      new_pos.row = node.row - 1;
      break;

    case "east":
      new_pos.col = node.col + 1;
      break;

    case "south":
      new_pos.row = node.row + 1;
      break;

    case "west":
      new_pos.col = node.col - 1;
      break;

    default:
      break;
  }

  if (!isInbound(table, new_pos) || new_pos.count > 10) {
    return null;
  }

  new_pos.heat += Number(table[new_pos.row][new_pos.col]);
  new_pos.path.push(`${new_pos.row}-${new_pos.col}`);
  return new_pos;
}

/**
 * @param {string[][]} table
 * @param {{row:string,col:string,direction:"north"|"east"|"south"|"west",count:number,heat:number}} node
 * @returns {{row:string,col:string,direction:"north"|"east"|"south"|"west",count:number,heat:number}[]}
 */
function getNeighbors(table, node) {
  const neighbors = [];

  const forward = getNextNode(table, node, node.direction);

  if (forward) neighbors.push(forward);

  if (node.count >= 4 && node.count <= 10) {
    if (node.direction == "east" || node.direction == "west") {
      const n1 = getNextNode(table, node, "north");
      const n2 = getNextNode(table, node, "south");
      if (n1) neighbors.push(n1);
      if (n2) neighbors.push(n2);
    } else {
      const n1 = getNextNode(table, node, "east");
      const n2 = getNextNode(table, node, "west");
      if (n1) neighbors.push(n1);
      if (n2) neighbors.push(n2);
    }
  }

  return neighbors;
}

export function walk(table) {
  const queue = new PriorityQueue((a, b) => {
    return b.heat - a.heat;
  });

  const visited = new Map();
  const target = `${table.length - 1}-${table[0].length - 1}`;

  queue.add({
    row: 0,
    col: 0,
    direction: "south",
    count: 0,
    heat: 0,
    path: [],
  });

  queue.add({
    row: 0,
    col: 0,
    direction: "east",
    count: 0,
    heat: 0,
    path: [],
  });

  while (queue.size > 0) {
    const node = queue.poll();
    const key = `${node.row}-${node.col}-${node.direction}-${node.count}`;

    if (key.includes(target)) return node;
    if (visited.has(key)) continue;
    visited.set(key, node.heat);

    const neighbors = getNeighbors(table, node);

    for (const neighbor of neighbors) {
      const n_key = `${neighbor.row}-${neighbor.col}-${neighbor.direction}`;
      if (!visited.has(n_key) || visited.get(n_key) > neighbor.heat) {
        queue.add(neighbor);
      }
    }
  }
}
