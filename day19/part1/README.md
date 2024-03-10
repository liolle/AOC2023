## Clumsy Crucible - Advent of Code Day 19 Challenge

[Challenge](https://adventofcode.com/2023/day/19)

### Problem Overview

Each part is rated in four categories and then processed through a series of workflows, each with its rules directing the part's path, ultimately leading to acceptance or rejection, where the system's efficiency is challenged by the influx of diverse metal shapes.

The objective is to filter out the rejected parts and calculate the sum of their x, m, a, and s ratings for the remaining parts.

### Approach

Generate a validation map and use it to verify each input.

### Algorithm

1.**Validation**

```js
function validate(input, map) {
  let current = "in";

  while (current != "R" && current != "A") {
    const checks = map.get(current);
    for (let condition of checks) {
      if (condition.key == "default") {
        current = condition.func("");
        continue;
      }
      const val = input[condition.key];
      const res = condition.func(val);
      if (!res) continue;
      current = res;
      break;
    }
  }
  return {
    sum: input.sum,
    accepted: current == "A",
  };
}
```

## Demo

```bash
node solution.mjs <path-to-input>
```
