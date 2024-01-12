## Mirage Maintenance - Advent of Code Day 9 Challenge

[Challenge](https://adventofcode.com/2023/day/9)

### Problem Overview

To safeguard the oasis, predict the next values in the historical data by iteratively generating difference sequences until a sequence of zeros is obtained, allowing for the extrapolation of the first value in the original history.

### Approach

We can use the same approach used in [part1](../part1/README.md), we would instead recursively compute the first element of each sequences.

### Algorithm

1. **Create pyramid**

   ```typescript
   function pyramid(array) {
     const res = [];
     let current = array;
     res.push(current);
     while (!checkAllSame(current)) {
       current = nextSequence(current);
       res.push(current);
     }
     return pushLastUp(res);
   }

   function pushLastUp(array) {
     return recurPushLastUp(array, 0);
   }

   function recurPushLastUp(array, last) {
     if (array.length == 0) {
       return first;
     }
     const current = array.pop();
     return recurPushLastUp(array, current[0] - first);
   }
   ```

## Demo

```bash
node solution.mjs <path-to-input>
```
