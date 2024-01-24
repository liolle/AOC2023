## Point of Incidence - Advent of Code Day 13 Challenge

[Challenge](https://adventofcode.com/2023/day/13)

### Problem Overview

Traversing a landscape filled with ash, igneous rocks, and mirrors, the goal is to identify the lines of reflection, either vertical or horizontal, within various patterns noted during the journey; the final objective is to sum the distances.

### Approach

We can see each line an colum as a string of character, for each each string that forms a palindrome would have a line of refection at the middle of the string, that mean that to have a perfect reflection, every string need to have the center of a substring that is a palindrome lined up at the same place.

The idea is to identify valid palindromes in each line, extracting their middle lines, and then checking if there is a consistent middle line for every row and column.

### Algorithm

1. **Find all Palindrome**

   ```js
   const findPalindromes = (input_string) => {
     const input = input_string.split("");
     const targets = [];
     for (let i = 0; i < input.length; i++) {
       for (let j = i; j < input.length; j++) {
         if ((i != 0 && j != input.length - 1) || i == j) continue;
         const target = input.slice(i, j + 1).join("");
         if (isPalindrome(target))
           targets.push({
             content: target,
             index: (j + i) / 2,
           });
       }
     }
     return {
       mirror_idx: targets.map((val) => val.index),
       line: input_string,
     };
   };
   ```

## Demo

```bash
node solution.mjs <path-to-input>
```
