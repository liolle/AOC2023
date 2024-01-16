export const inputToArray = (input) => {
  const arr = input
    .trim()
    .split("\n")
    .map((row) => row.trim().split(""));

  return arr;
};

const pointMap = (table) => {
  const set = new Set();

  const empty_set = new Set();
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[0].length; j++) {
      if (table[i][j] == "#") {
        set.add(`R${i}`);
        set.add(`C${j}`);
      }
    }
  }
  for (let i = 0; i < table.length; i++) {
    if (!set.has(`R${i}`)) empty_set.add(`R${i}`);
  }

  for (let i = 0; i < table[0].length; i++) {
    if (!set.has(`C${i}`)) empty_set.add(`C${i}`);
  }

  return empty_set;
};

export const transformTable = (table) => {
  const marks = pointMap(table);
  const res_table = [];
  for (let i = 0; i < table.length; i++) {
    const tmp_arr = [];
    if (marks.has(`R${i}`)) res_table.push(tmp_arr);
    for (let j = 0; j < table[0].length; j++) {
      if (marks.has(`C${j}`)) {
        tmp_arr.push(".");
      }
      tmp_arr.push(table[i][j]);
    }
    res_table.push(tmp_arr);
  }

  return res_table;
};

const galaxies = (table) => {
  let res = [];
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[0].length; j++) {
      if (table[i][j] == "#") {
        res.push({
          row: i,
          col: j,
          distance: 0,
          path: [],
        });
      }
    }
  }
  return res;
};

export const softScan = (table) => {
  const start_points = galaxies(table);
  const paths = [];

  while (start_points.length > 0) {
    const current_point = start_points.pop();
    for (const pos of start_points) {
      const distance =
        Math.abs(pos.row - current_point.row) +
        Math.abs(pos.col - current_point.col);
      paths.push({
        start: `${pos.row}-${pos.col}`,
        end: `${current_point.row}-${current_point.col}`,
        distance: distance,
      });
    }
  }

  return paths;
};
