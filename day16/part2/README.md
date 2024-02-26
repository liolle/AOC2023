## The Floor Will Be Lava - Advent of Code Day 16 Challenge

[Challenge](https://adventofcode.com/2023/day/16)

### Problem Overview

The objective is to find the path within the contraption grid that maximizes the number of energized tiles.

### Approach

Comparing every possible start

### Algorithm

```js
const starter = getStartList(table);
let max = 0;
for (const start of starter) {
  const current = walk(table, start);
  max = Math.max(max, current);
}
```

## Demo

```bash
node solution.mjs <path-to-input>
```
