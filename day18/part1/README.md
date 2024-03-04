## Clumsy Crucible - Advent of Code Day 18 Challenge

[Challenge](https://adventofcode.com/2023/day/18)

### Problem Overview

The task involves guiding a digger through specified directions to excavate a lagoon, with each direction marked by a color code, aiming to determine the potential volume of lava the lagoon could hold.

### Approach

One way to solve this challenge would be to recreate the shape formed by the list of direction into a 2d array and count the number of point inside tha shape using the [Ray casting algorithm](https://en.wikipedia.org/wiki/Point_in_polygon).

### Algorithm

1.**Ray casting**

```js
/**
 * @param {string[][]} table
 * @param {{row:number,col:number}} point
 */
function isInside(table, point) {
  let intersect = 0;
  if (table[point.row][point.col] == "#") return false;
  for (let i = point.col; i < table[point.row].length; i++) {
    if (table[point.row][i] == "#") {
      let count = 0;
      const p1 = table[point.row][i];
      const p2 = point.row < table.length - 1 ? table[point.row + 1][i] : ".";

      if (p1 == "#" && p2 == "#") intersect++;
    }
  }

  return intersect % 2 != 0 && intersect != 0;
}
```

## Demo

```bash
node solution.mjs <path-to-input>
```
