## Cosmic Expansion - Advent of Code Day 11 Challenge

[Challenge](https://adventofcode.com/2023/day/11)

### Problem Overview

The researcher, faced with a universe where certain rows and columns expanded due to gravitational effects.

Our goal is to determine the sum of the lengths of the shortest paths between all pairs of galaxies in an expanded universe grid, where empty spaces and galaxies are represented respectively by . and # .

Gravitational effects cause selective expansion in the universe, the size of row and column is now 1000000 times bigger.

### Approach

We can leverage the absence of obstacles along any path connecting one galaxy to another.

As a result, the distance between tow galaxies will always be the sum of steps required to reach the correct row and the steps needed to reach the correct column.

### Algorithm

1. **Search**

- Perform a search of every galaxies.

```js
const softScan = (table) => {
  const start_points = galaxies(table);
  const gaps = point_map(table);
  const paths = [];
  const multiplier = 1000000;
  while (start_points.length > 0) {
    const current_point = start_points.pop();
    for (const pos of start_points) {
      let gap_traveled = 0;
      const [left_most_col, right_most_col] =
        current_point.col > pos.col
          ? [pos.col, current_point.col]
          : [current_point.col, pos.col];

      const [top_most_row, bottom_most_row] =
        current_point.row > pos.row
          ? [pos.row, current_point.row]
          : [current_point.row, pos.row];
      for (let i = left_most_col; i <= right_most_col; i++) {
        if (gaps.has(`C${i}`)) gap_traveled++;
      }
      for (let i = top_most_row; i <= bottom_most_row; i++) {
        if (gaps.has(`R${i}`)) gap_traveled++;
      }
      const distance =
        Math.abs(pos.row - current_point.row) +
        Math.abs(pos.col - current_point.col) -
        gap_traveled +
        gap_traveled * multiplier;
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
