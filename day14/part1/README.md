## Parabolic Reflector Dish - Advent of Code Day 14 Challenge

[Challenge](https://adventofcode.com/2023/day/14)

### Problem Overview

The task is to calculate the total load on the north support beams, with rounded rocks contributing to load based on their distance from the south edge of the platform.

### Approach

We first want to adjust the table so that all rocks tilt towards the upper row.

Subsequently, we can determine the total load for each row by adding up the individual loads.

### Algorithm

1. **Tilt north**

```js
function processPos(table, gap_map, row, col) {
  switch (table[row][col]) {
    case ".":
      addGap(gap_map, row, col);
      break;
    case "O":
      const new_pos = popFirst(gap_map, col);
      if (new_pos != undefined) {
        table[row][col] = ".";
        table[new_pos][col] = "O";
        addGap(gap_map, row, col);
      }
      break;
    case "#":
      resetGap(gap_map, col);
      break;
    default:
      break;
  }
}

function tiltNorth(table) {
  const cp_table = [...table];
  const gap_map = new Map();
  for (let i = 0; i < cp_table.length; i++) {
    for (let j = 0; j < cp_table[i].length; j++) {
      processPos(cp_table, gap_map, i, j);
    }
  }
  return cp_table;
}
```

2. **Calculate load**

```js
function calculateLoad(table) {
  let sum = 0;
  let multiplier = table.length;
  for (const row of table) {
    const rocks = row.reduce((acc, cur) => {
      if (cur == "O") {
        return acc + 1;
      }
      return acc;
    }, 0);
    sum += multiplier * rocks;
    multiplier--;
  }
  return sum;
}
```

## Demo

```bash
node solution.mjs <path-to-input>
```
