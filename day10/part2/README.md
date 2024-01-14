## Mirage Maintenance - Advent of Code Day 9 Challenge

[Challenge](https://adventofcode.com/2023/day/10)

### Problem Overview

In a densely packed field with pipes represented as a two-dimensional grid and following specific pipe symbols, including vertical and horizontal connections, 90-degree bends, and a starting position marked with 'S'.

The objective is to identify a continuous loop and determine the number of points within that loop.

### Approach

We can start by making a list of pipes that are in the contour of our form, to get the number of point trapped inside the form we can use the [Ray casting algorithm](https://en.wikipedia.org/wiki/Point_in_polygon).

To count the number of points trapped inside the form, we can use the [Ray casting algorithm](https://en.wikipedia.org/wiki/Point_in_polygon).

### Algorithm

1. **Create Border**

- Utilize a BFS approach, as demonstrated in [part1](../part1/README.md) to generate our list of contour points

2. **Ray casting**

- Execute the following check for every point

  ```ts
  const ray_cast = (position, arr, borders) => {
    let count = 0;
    for (let i = position.col; i < arr[position.row].length; i++) {
      if (
        /F|7|\||S/.test(arr[position.row][i]) &&
        borders.has(`${position.row}-${i}`)
      ) {
        count++;
      }
    }
    return count;
  };
  ```

## Demo

```bash
node solution.mjs <path-to-input>
```
