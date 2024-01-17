/**
 * value
 * next
 */

export const inputToArray = (input) => {
  const arr = input
    .trim()
    .split("\n")
    .map((row) => row.trim().split(""));

  return arr;
};

const point_map = (table) => {
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
  const marks = point_map(table);
  const res_table = [];

  const col_num = Array.from(marks, (value) => value).filter((val) =>
    /C./.test(val)
  ).length;
  const empty_line = new Array(table[0].length + col_num).fill(".");
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

export const galaxies = (table) => {
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
  const gaps = point_map(table);
  const paths = [];
  const multiplier = 1000000;

  while (start_points.length > 0) {
    const current_point = start_points.pop();
    for (const pos of start_points) {
      let gap_traveled = 0;

      const [left_most_col, right_most_col] =
        current_point.col > pos.col
          ? [pos.col, current_point.col]
          : [current_point.col, pos.col];

      const [top_most_row, bottom_most_row] =
        current_point.row > pos.row
          ? [pos.row, current_point.row]
          : [current_point.row, pos.row];

      for (let i = left_most_col; i <= right_most_col; i++) {
        if (gaps.has(`C${i}`)) gap_traveled++;
      }

      for (let i = top_most_row; i <= bottom_most_row; i++) {
        if (gaps.has(`R${i}`)) gap_traveled++;
      }

      const distance =
        Math.abs(pos.row - current_point.row) +
        Math.abs(pos.col - current_point.col) -
        gap_traveled +
        gap_traveled * multiplier;
      paths.push({
        start: `${pos.row}-${pos.col}`,
        end: `${current_point.row}-${current_point.col}`,
        distance: distance,
      });
    }
  }

  return paths;
};
