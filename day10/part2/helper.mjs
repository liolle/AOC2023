const pretty_tile = new Map();
pretty_tile.set("|", "║");
pretty_tile.set("-", "═");
pretty_tile.set("L", "╚");
pretty_tile.set("J", "╝");
pretty_tile.set("7", "╗");
pretty_tile.set("F", "╔");
pretty_tile.set("S", "S");
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
  let adjusted = false;

  let new_row = position.row % arr.length;
  let new_col = position.col % arr[0].length;
  if (position.row >= arr.length || position.col >= arr[0].length) {
    adjusted = true;
  }

  if (new_row < 0) {
    new_row = arr.length - 1;
    adjusted = true;
  }
  if (new_col < 0) {
    new_col = arr[0].length - 1;
    adjusted = true;
  }

  if (adjusted) {
    return {
      row: new_row,
      col: new_col,
      distance: position.distance,
      adjusted: true,
    };
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

    const post = adjust_pos(current_pos, arr);

    const nb_start = neighbors(post, arr);
    for (const n of nb_start) {
      if (n.row == position.row && n.col == position.col) {
        res.push(adjust_pos(current_pos, arr));
      }
    }
  }
  return res;
};

const regular_neighbor = (position, arr) => {
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
      distance: 0,
    };

    res.push(adjust_pos(current_pos, arr));
  }
  return res;
};

const ray_cast = (position, arr, borders) => {
  let count = 0;

  for (let i = position.col; i < arr[position.row].length; i++) {
    if (
      /F|7|\||S/.test(arr[position.row][i]) &&
      borders.has(`${position.row}-${i}`)
    ) {
      count++;
    }
  }
  return count;
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

  paint(arr, visited, {
    row: 0,
    col: 0,
  });

  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      const tile = visited.get(`${i}-${j}`);
      if (tile != undefined) {
        continue;
      }
      const intersect = ray_cast(
        {
          row: i,
          col: j,
        },
        arr,
        visited
      );

      if (!(intersect % 2 == 0) && intersect != 0) {
        arr[i][j] = "X";

        count++;
      }
    }
  }

  draw_maze(arr, visited);

  return count;
};

const draw_maze = (arr, borders) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      const tile = borders.get(`${i}-${j}`);
      if (tile != undefined) {
        arr[i][j] = pretty_tile.get(arr[i][j]);
      } else if (arr[i][j] != " " && arr[i][j] != "X") {
        arr[i][j] = " ";
      }
    }
  }

  for (const elem of arr) {
    const result = elem.reduce((a, c) => `${a}${c}`, "");
    console.log(result);
  }
};

const paint = (arr, borders, start) => {
  const queue = [];
  const visited = new Map();
  let enclosed = true;

  queue.push(start);

  while (queue.length > 0) {
    const current = queue.pop();
    visited.set(`${current.row}-${current.col}`, arr[current.row][current.col]);
    arr[current.row][current.col] = " ";
    const nb = regular_neighbor(current, arr);

    for (const n of nb) {
      if (n.adjusted) {
        enclosed = false;
      }
      if (
        visited.get(`${n.row}-${n.col}`) == undefined &&
        borders.get(`${n.row}-${n.col}`) == undefined
      ) {
        queue.push(n);
      }
    }
  }
  return {
    enclosed: enclosed,
    visited: visited,
  };
};
