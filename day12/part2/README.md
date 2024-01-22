## Hot Springs - Advent of Code Day 12 Challenge

[Challenge](https://adventofcode.com/2023/day/12)

### Problem Overview

In a field outside, springs are arranged in rows, with operational (.) or damaged (#) conditions, and the damaged part itself is sometimes unknown (?); additionally, the engineer provided a duplicated format indicating contiguous groups of damaged springs after each row; with given conditions, the task is to determine the number of different arrangements of operational and damaged springs in each row.

Now the input is way bigger.

### Approach

We can progressively build the spring using recursion to look for every valid spring combination.

### Algorithm

1. **Recursion**

```js
function recurWalk(state, index, current_group, constraint, path, map) {
  if (map.has(`${index}-${constraint.length}-${current_group}`)) {
    return map.get(`${index}-${constraint.length}-${current_group}`);
  }

  if (constraint.length == 0) {
    if (state.slice(index).includes("#")) return 0;
    return 1;
  }
  if (index >= state.length) {
    if (constraint.length == 1 && constraint[0] == current_group) {
      return 1;
    }

    return 0;
  }

  if (constraint[0] < current_group) {
    return 0;
  }
  //recur
  switch (state[index]) {
    case "#":
      const res = recurWalk(
        state,
        index + 1,
        current_group + 1,
        constraint,
        path + "#",
        map
      );
      map.set(`${index}-${constraint.length}-${current_group}`, res);
      return res;

    case ".":
      if (constraint[0] == current_group) {
        const res = recurWalk(
          state,
          index + 1,
          0,
          constraint.slice(1),
          path + ".",
          map
        );
        map.set(`${index}-${constraint.length}-${current_group}`, res);
        return res;
      } else {
        if (current_group == 0) {
          const res = recurWalk(
            state,
            index + 1,
            0,
            constraint,
            path + ".",
            map
          );
          map.set(`${index}-${constraint.length}-${current_group}`, res);
          return res;
        }
        map.set(`${index}-${constraint.length}-${current_group}`, 0);
        return 0;
      }

    case "?":
      let dot = 0;
      if (constraint[0] == current_group) {
        const res = recurWalk(
          state,
          index + 1,
          0,
          constraint.slice(1),
          path + ".",
          map
        );
        map.set(`${index}-${constraint.length}-${current_group}`, res);
        dot = res;
      } else {
        if (current_group == 0) {
          const res = recurWalk(
            state,
            index + 1,
            0,
            constraint,
            path + ".",
            map
          );
          dot = res;
        }
      }

      let tag = recurWalk(
        state,
        index + 1,
        current_group + 1,
        constraint,
        path + "#",
        map
      );

      return dot + tag;
    default:
      break;
  }
}
```

## Demo

```bash
node solution.mjs <path-to-input>
```
