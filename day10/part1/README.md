## Mirage Maintenance - Advent of Code Day 9 Challenge

[Challenge](https://adventofcode.com/2023/day/10)

### Problem Overview

In a densely packed field with pipes represented as a two-dimensional grid and following specific pipe symbols, including vertical and horizontal connections, 90-degree bends, and a starting position marked with 'S', the task is to identify a continuous loop and determine the number of steps it takes to reach the farthest point from the starting position within that loop.

### Approach

In order to explore the pipes outlining our form, we can use a DFS approach, while recording the number of steps taken to reach each individual point in the contour.

### Algorithm

1. **DFS walk**

- After preparing our data we can perform the dfs walk as follow.

  ```ts
  const walk = (fileContent) => {
    const arr = inputToArray(fileContent);
    const start = find_start(arr);
    const queue = [];
    const visited = new Map();

    const nb_start = neighbors_start(start, arr);
    visited.set(`${start.row}-${start.col}`, 0);

    // pushing first adjacent pipes in the queues
    for (const n of nb_start) {
      queue.push(n);
    }

    while (queue.length > 0) {
      const current = queue.shift();
      const nb = neighbors(current, arr);
      for (const n of nb) {
        if (visited.get(`${n.row}-${n.col}`) == undefined) {
          queue.push(n);
        }
      }
      visited.set(`${current.row}-${current.col}`, current.distance);
    }
    return Array.from(visited, ([key, value]) => value).reduce(
      (max, current) => {
        return Math.max(current, max);
      },
      -Infinity
    );
  };
  ```

## Demo

```bash
node solution.mjs <path-to-input>
```
