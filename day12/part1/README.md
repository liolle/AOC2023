## Hot Springs - Advent of Code Day 12 Challenge

[Challenge](https://adventofcode.com/2023/day/12)

### Problem Overview

In a field outside, springs are arranged in rows, with operational (.) or damaged (#) conditions, and the damaged part itself is sometimes unknown (?); additionally, the engineer provided a duplicated format indicating contiguous groups of damaged springs after each row; with given conditions, the task is to determine the number of different arrangements of operational and damaged springs in each row.

### Approach

This can be approached as a search problem, where we aim to enumerate all possibilities and select only the valid ones.
Using a Breadth-First Search (BFS) strategy would be suitable for this task.

### Algorithm

1. **Custom BFS**

- Create a BFS class tailored for this challenge .

```js
class BFS {
  constructor() {}
  /**
   *
   * @param {string} state
   * @returns
   */
  static regular_neighbor = (state) => {
    const split_state = state.split("");
    const res = [];
    for (let i = 0; i < split_state.length; i++) {
      if (split_state[i] == "?") {
        let new_state = [...split_state];
        new_state[i] = "#";
        res.push(new_state.join(""));
      }
    }
    return res;
  };
  /*
  ...
  */
  static walk(start, constraint) {
    const queue = new Queue();
    const visited = new Set();
    const visited_target = new Set();
    queue.enqueue(start);
    while (!queue.isEmpty()) {
      let state = queue.dequeue();
      visited.add(state);
      if (this.isCorrectState(state, constraint)) {
        visited_target.add(state);
        continue;
      }
      const neighbors = this.regular_neighbor(state);
      for (const st of neighbors) {
        if (!visited.has(st) && this.isValidState(st, constraint)) {
          queue.enqueue(st);
        }
      }
    }
    return visited_target;
  }
}
```

2. **Calculate sum**

- Iterate over each line an use the BFS class to calculate tne number of possibility for each lines ?

```js
const inputs = fileContent.split("\n").map((val) => {
  const [state, constraint] = val.split(" ");
  return [
    state.trim(),
    constraint
      .trim()
      .split(",")
      .map((val) => Number(val)),
  ];
});
let sum = 0;
let i = 0;
for (const input of inputs) {
  sum += BFS.walk(input[0], input[1]).size;
}
console.log(sum);
```

## Demo

```bash
node solution.mjs <path-to-input>
```
