## The Floor Will Be Lava - Advent of Code Day 16 Challenge

[Challenge](https://adventofcode.com/2023/day/16)

### Problem Overview

The objective is to determine the number of energized tiles in the contraption, where a tile is considered energized if it has at least one beam pass through it, reflect in it, or split in it.

### Approach

Use a DFS to visit all the cell traversed by a beam

### Algorithm

1. **DFS**

```js
function walk(table) {
  const queue = [];
  const visited = new Set();

  queue.push({
    row: 0,
    col: 0,
    direction: "east",
  });
  while (queue.length > 0) {
    const node = queue.pop();
    visited.add(`${node.row}-${node.col}.${node.direction}`);
    const neighbors = getNeighbors(table, node);
    for (const neighbor of neighbors) {
      if (
        !visited.has(`${neighbor.row}-${neighbor.col}.${neighbor.direction}`)
      ) {
        queue.push(neighbor);
      }
    }
  }
  const cp_table = [...table];
  for (let i = 0; i < cp_table.length; i++) {
    for (let j = 0; j < cp_table.length; j++) {
      cp_table[i][j] = ".";
    }
  }
  let count = 0;
  visited.forEach((val) => {
    const pos = val
      .split(".")[0]
      .split("-")
      .map((val) => Number(val));
    if (cp_table[pos[0]][pos[1]] != "#") count++;
    cp_table[pos[0]][pos[1]] = "#";
  });

  return count;
}
```

## Demo

```bash
node solution.mjs <path-to-input>
```
