## Clumsy Crucible - Advent of Code Day 17 Challenge

[Challenge](https://adventofcode.com/2023/day/17)

### Problem Overview

To efficiently transport the crucible from the lava pool to the machine parts factory on the Desert Island, while minimizing heat loss and adhering to movement constraints.

The challenge is to find the optimal route through a city grid where each block incurs a specific amount of heat loss, with the crucible limited to making at most three consecutive movements before turning 90 degrees left or right.

### Approach

Use [dijkstra](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)

### Algorithm

## Demo

1.**Walk**

```js
function walk(table) {
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
```

```bash
node solution.mjs <path-to-input>
```
