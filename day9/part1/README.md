## Mirage Maintenance - Advent of Code Day 9 Challenge

[Challenge](https://adventofcode.com/2023/day/9)

### Problem Overview

To safeguard the oasis, predict the next values in the historical data by iteratively generating difference sequences until a sequence of zeros is obtained, allowing for the extrapolation of the next value in the original history.

### Approach

Beginning with the provided sequence, we can iteratively compute the next sequence, which is a list of differences between consecutive numbers in the preceding sequence.

Once we have reached a sequence where all number are equal we can recursively determine the last element of each sequence.

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
       return last;
     }
     const current = array.pop();
     return recurPushLastUp(array, current[current.length - 1] + last);
   }
   ```

## Demo

```bash
node solution.mjs <path-to-input>
```
