/**
 *
 * @param {string} fileContent
 * @returns {{
 *  rows:number,
 *  cols: number,
 * vertex: {
 * row:number,
 * col:number,
 * color:string
 * }[]
 *
 * }}
 */
export function extractData(fileContent) {
  const lines = fileContent.split("\n").map((val) => val.trim());

  const vertex = [];
  let min_row = Infinity;
  let max_row = -Infinity;
  let min_col = Infinity;
  let max_col = -Infinity;
  let cur_row = 0;
  let cur_col = 0;
  for (const line of lines) {
    const [direction, len, color] = line.split(" ");
    switch (direction) {
      case "R":
        cur_col += Number(len);
        min_col = Math.min(cur_col, min_col);
        max_col = Math.max(cur_col, max_col);
        break;
      case "L":
        cur_col -= Number(len);
        min_col = Math.min(cur_col, min_col);
        max_col = Math.max(cur_col, max_col);
        break;
      case "U":
        cur_row -= Number(len);
        min_row = Math.min(cur_row, min_row);
        max_row = Math.max(cur_row, max_row);
        break;
      case "D":
        cur_row += Number(len);
        min_row = Math.min(cur_row, min_row);
        max_row = Math.max(cur_row, max_row);
        break;

      default:
        break;
    }
  }

  cur_row = 0 + Math.abs(min_row);
  cur_col = 0 + Math.abs(min_col);
  for (const line of lines) {
    const [direction, len, color] = line.split(" ");
    switch (direction) {
      case "R":
        for (let i = 0; i < len; i++) {
          cur_col++;
          vertex.push({
            row: cur_row,
            col: cur_col,
            color: color,
          });
        }
        break;
      case "L":
        for (let i = 0; i < len; i++) {
          cur_col--;
          vertex.push({
            row: cur_row,
            col: cur_col,
            color: color,
          });
        }
        break;
      case "U":
        for (let i = 0; i < len; i++) {
          cur_row--;
          vertex.push({
            row: cur_row,
            col: cur_col,
            color: color,
          });
        }
        break;
      case "D":
        for (let i = 0; i < len; i++) {
          cur_row++;
          vertex.push({
            row: cur_row,
            col: cur_col,
            color: color,
          });
        }
        break;

      default:
        break;
    }
  }
  return {
    rows: max_row - min_row,
    cols: max_col - min_col,
    vertex: vertex,
  };
}

/**
 *
 * @param {string[][]} table
 * @param {{row:number,col:number}} point
 */
function isInside(table, point) {
  let intersect = 0;
  if (table[point.row][point.col] == "#") return false;
  for (let i = point.col; i < table[point.row].length; i++) {
    if (table[point.row][i] == "#") {
      let count = 0;
      const p1 = table[point.row][i];
      const p2 = point.row < table.length - 1 ? table[point.row + 1][i] : ".";

      if (p1 == "#" && p2 == "#") intersect++;
    }
  }

  return intersect % 2 != 0 && intersect != 0;
}

/**
 *
 * @param {{
 *  rows:number,
 *  cols: number,
 * vertex: {
 * row:number,
 * col:number,
 * color:string
 * }[]
 *}} data
 */
export function buildTable(data) {
  const table = [];

  for (let i = 0; i <= data.rows; i++) {
    const t = new Array(data.cols + 1).fill(".");
    table.push(t);
  }

  for (const v of data.vertex) {
    table[v.row][v.col] = "#";
  }

  return table;
}

export function prettyTable(table) {
  return table.reduce((acc, cur) => {
    if (acc == "") return cur.join("");
    return `${acc}\n${cur.join("")}`;
  }, "");
}

export function fillTable(table) {
  let count = 0;
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      const isIn = isInside(table, {
        row: i,
        col: j,
      });
      if (isIn) {
        table[i][j] = "-";
        count++;
      } else {
        if (table[i][j] == "#") {
          count++;
        } else {
          table[i][j] = " ";
        }
      }
    }
  }
  return count;
}
