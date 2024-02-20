## Lens Library - Advent of Code Day 15 Challenge

[Challenge](https://adventofcode.com/2023/day/15)

### Problem Overview

The problem involves implementing the Holiday ASCII String Helper algorithm (appendix 1A), which utilizes a HASH algorithm to convert strings into single numbers, and then calculating the sum of the results obtained by running this algorithm on each step in an initialization sequence.

### Approach

Iterate over all comma separated words and sum up their decoded value using `stringCode`

### Algorithm

1.**Decode String**

```js
export function stringCode(word) {
  let result = 0;
  for (const char of word) {
    const base = result + char.charCodeAt(0);
    result = (base * 17) % 256;
  }
  return result;
}
```

## Demo

```bash
node solution.mjs <path-to-input>
```
