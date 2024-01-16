## Cosmic Expansion - Advent of Code Day 11 Challenge

[Challenge](https://adventofcode.com/2023/day/11)

### Problem Overview

The researcher, faced with a universe where certain rows and columns expanded due to gravitational effects.

Our goal is to determine the sum of the lengths of the shortest paths between all pairs of galaxies in an expanded universe grid, where empty spaces and galaxies are represented respectively by . and # .

Gravitational effects cause selective expansion in the universe, doubling the size of rows and columns without galaxies.

### Approach

We start by converting our input into its corresponding array, and add an additional column or row for each row and column that does not contain any galaxies.

We then can use a BFS to compute the shortest path between any two point.

### Algorithm

1. **Prepare table**

- Transform input tab by adding colum an rows where needed.

```js
const transformTable = (table) => {
  // set of row and col missing a galaxies Ex. R2 => no galaxies on the third row
  const marks = point_map(table);
  const res_table = [];
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
```

2. **Search**

- Perform a search of every galaxies

```js
const softScan = (table) => {
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
```

## Demo

```bash
node solution.mjs <path-to-input>
```
