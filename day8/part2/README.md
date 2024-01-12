## Haunted Wasteland - Advent of Code Day 8 Challenge

[Challenge](https://adventofcode.com/2023/day/8)

### Problem Overview

The challenge involves navigating a network of nodes using left/right instructions starting from node ..A, with the goal of reaching node ..Z, all node needs to reach and ending node simultaneously

### Approach

Assuming each path forms a cycle that returns to the initial element after reaching and ending position, we can find the solution process by utilizing the lowest common multiple of the length of all cycles.

### Algorithm

1. **Prepare Map:**

   ```typescript
   const store_path = (document) => {
     const slit_document = document.split("\n");
     const map = new Map();
     for (const line of slit_document) {
       const regex = /[A-Z]{3} =/;
       if (regex.test(line)) {
         const key_split = line.split("=");
         const key = key_split[0].trim();
         const direction = key_split[1]
           .trim()
           .split(",")
           .map((val) => val.replace("(", "").replace(")", ""));

         const dir = {
           L: direction[0].trim(),
           R: direction[1].trim(),
         };
         map.set(key, dir);
       }
     }
     return map;
   };
   ```

2. **Navigate**

   ```typescript
   const walk = (path, directions, spots) => {
     const LCM_MAP = [];
     for (let i = 0; i < spots.length; i++) {
       LCM_MAP.push(single_walk(path, directions, spots[i]));
     }
     LCM_MAP.sort((a, b) => a - b);
     let multiple = LCM_MAP[LCM_MAP.length - 1];
     while (!full_modulo(LCM_MAP, multiple)) {
       multiple += LCM_MAP[LCM_MAP.length - 1];
     }
     console.log(multiple);
   };
   ```

## Demo

```bash
node solution.mjs <path-to-input>
```
