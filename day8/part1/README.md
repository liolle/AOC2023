## Haunted Wasteland - Advent of Code Day 8 Challenge

[Challenge](https://adventofcode.com/2023/day/8)

### Problem Overview

The challenge involves navigating a network of nodes using left/right instructions starting from node AAA, with the goal of reaching node ZZZ

### Approach

Create a network map based on the given node relationships, utilize a list of left/right directions to navigate through the nodes starting from AAA, and repeat the direction sequence as needed until reaching node ZZZ while keeping track of the number of steps

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
   const walk = (path, directions) => {
     let idx = 0;
     let current_spot = "AAA";
     let count = 0;

     while (current_spot != "ZZZ") {
       current_spot = directions.get(current_spot)[path[idx]];
       idx = (idx + 1) % path.length;
       count++;
     }
     return count;
   };
   ```

## Demo

```bash
node solution.mjs <path-to-input>
```
