[Challenge](https://adventofcode.com/2023/day/19)

### Problem Overview

Each part is rated in four categories and then processed through a series of workflows, each with its rules directing the part's path, ultimately leading to acceptance or rejection, where the system's efficiency is challenged by the influx of diverse metal shapes.

The objective is to filter out the rejected parts and calculate the sum of their x, m, a, and s ratings for the remaining parts.

### Approach

For every keys x, m, a, and s, begin with the initial range of 1 to 4000 and iteratively adjust the ranges based on the validation map. Continue this process until either A or R is reached. Once the process reaches either A or R, retain the accepted range and calculate the sum of the products within this range.

### Algorithm

1.**Walk**

```js
function walk(map) {
  const queue = [
    {
      key: "in",
      idx: 0,
      ranges: {
        x: [1, 4000],
        m: [1, 4000],
        a: [1, 4000],
        s: [1, 4000],
      },
      last: "",
    },
  ];
  const accepted = [];
  const rejected = [];

  while (queue.length > 0) {
    const node = queue.pop();
    if (node.key == "A" || node.key == "R") {
      if (node.key == "A") accepted.push(node.ranges);
      continue;
    }

    const nb = splitRange(node, map);
    for (let el of nb) {
      queue.push(el);
    }
  }
  return [accepted, rejected];
}
```

## Demo

```bash
node solution.mjs <path-to-input>
```
