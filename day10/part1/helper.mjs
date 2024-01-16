const direction_map = new Map();
direction_map.set("|", [
  { row: -1, col: 0 },
  { row: 1, col: 0 },
]);
direction_map.set("-", [
  { row: 0, col: -1 },
  { row: 0, col: 1 },
]);
direction_map.set("L", [
  { row: -1, col: 0 },
  { row: 0, col: 1 },
]);
direction_map.set("J", [
  { row: -1, col: 0 },
  { row: 0, col: -1 },
]);
direction_map.set("7", [
  { row: 1, col: 0 },
  { row: 0, col: -1 },
]);
direction_map.set("F", [
  { row: 1, col: 0 },
  { row: 0, col: 1 },
]);

const inputToArray = (input) => {
  const arr = input
    .trim()
    .split("\n")
    .map((row) => row.trim().split(""));

  return arr;
};

const adjust_pos = (position, arr) => {
  let new_row = position.row % arr.length;
  let new_col = position.col % arr[0].length;

  if (new_row < 0) {
    new_row = arr.length - 1;
  }
  if (new_col < 0) {
    new_col = arr[0].length;
  }

  return {
    row: new_row,
    col: new_col,
    distance: position.distance,
  };
};

const find_start = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] == "S") {
        return {
          row: i,
          col: j,
          distance: 0,
        };
      }
    }
  }
  return null;
};

const neighbors_start = (position, arr) => {
  const directions = [
    { row: 0, col: 1 },
    { row: 0, col: -1 },
    { row: 1, col: 0 },
    { row: -1, col: 0 },
  ];

  const res = [];
  for (const dir of directions) {
    const current_pos = {
      row: position.row + dir.row,
      col: position.col + dir.col,
      distance: position.distance + 1,
    };

    const nb_start = neighbors(current_pos, arr);
    for (const n of nb_start) {
      if (n.row == position.row && n.col == position.col) {
        res.push(current_pos);
      }
    }
  }
  return res;
};

const neighbors = (position, arr) => {
  let directions = direction_map.get(arr[position.row][position.col]);
  const res = [];

  if (!directions) return res;

  for (const dir of directions) {
    const current_pos = {
      row: position.row + dir.row,
      col: position.col + dir.col,
      distance: position.distance + 1,
    };

    res.push(adjust_pos(current_pos, arr));
  }
  return res;
};

export const walk = (fileContent) => {
  const arr = inputToArray(fileContent);
  const start = find_start(arr);
  const queue = [];
  const visited = new Map();

  const nb_start = neighbors_start(start, arr);
  visited.set(`${start.row}-${start.col}`, 0);
  for (const n of nb_start) {
    queue.push(n);
  }

  while (queue.length > 0) {
    const current = queue.shift();

    const nb = neighbors(current, arr);
    for (const n of nb) {
      if (visited.get(`${n.row}-${n.col}`) == undefined) {
        queue.push(n);
      }
    }
    visited.set(`${current.row}-${current.col}`, current.distance);
  }

  return Array.from(visited, ([key, value]) => value).reduce((max, current) => {
    return Math.max(current, max);
  }, -Infinity);
};
