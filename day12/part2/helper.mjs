/**
 *
 * @param {string[]} state
 * @param {number} index
 * @param {number} current_group
 * @param {number[]} constraint
 * @param {string} path
 * @param {Map<string, number>} map
 */
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

/**
 *
 * @param {string[]} state
 * @param {number[]} constraint
 */
export function walk(state, constraint) {
  const map = new Map();
  const res = recurWalk(state, 0, 0, constraint, "", map);
  return res;
}
