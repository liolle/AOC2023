## Parabolic Reflector Dish - Advent of Code Day 14 Challenge

[Challenge](https://adventofcode.com/2023/day/14)

### Problem Overview

The task is to calculate the total load after 1 000 000 000 cycles

`cycle` : tilt the table successively `north` `west` `south` `east`

### Approach

We can assume that there exist `n` and `k` where after `n` cycles, the arrangement of rocks forms a repeating pattern of `k` cycles.

By caching intermediate result we would then be able to calculate the load without iterating for 1 000 000 000 cycles

### Algorithm

1. **Cycle 1**

```js
/**
 * @param {string[][]} table
 * @param {"north"|"east"|"south"|"west"} direction
 * @returns {string[][]}
 */
export function tiltTable(table, direction) {
  switch (direction) {
    case "north":
      return tiltNorth(table);
    case "east":
      return tiltEast(table);
    case "south":
      return tiltSouth(table);
    case "west":
      return tiltWest(table);
    default:
      return table;
  }
}
export function cycle(table) {
  for (const direction of ["north", "west", "south", "east"]) {
    tiltTable(table, direction);
  }
  return table;
}
```

2. **Cycle N**

```js
/**
 * @param {string[][]} table
 * @returns {number|undefined}
 */
export function cycleN(table, n) {
  const cache = new Map();
  for (let i = 0; i < n; i++) {
    const mark = markTable(table);
    if (cache.has(mark)) {
      const cycle_start = cache.get(mark).idx;
      const cycle_length = i - cycle_start;
      const loop_start = n - cycle_start;
      const loop_length = Number.parseInt(loop_start / cycle_length);
      const true_idx = loop_start - loop_length * cycle_length + cycle_start;

      return Array.from(cache, ([name, value]) => value).find(
        (val) => val.idx == true_idx
      ).load;
    }
    cache.set(mark, {
      idx: i,
      load: calculateLoad(table),
    });
    table = cycle(table);
  }
}
```

## Demo

```bash
node solution.mjs <path-to-input>
```
