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
export function computeArea(fileContent) {
  const lines = fileContent.split("\n").map((val) => val.trim());
  let cur_row = 0;
  let cur_col = 0;
  let last = null;
  let first = null;
  let sum = 0;
  let n = 0;
  first = {
    row: cur_row,
    col: cur_col,
  };
  last = first;
  for (const line of lines) {
    let [direction, len, color] = line.split(" ");
    color = color.slice(2, color.length - 1);
    if (color[color.length - 1] == "0") direction = "R";
    if (color[color.length - 1] == "1") direction = "D";
    if (color[color.length - 1] == "2") direction = "L";
    if (color[color.length - 1] == "3") direction = "U";
    len = parseInt(color.slice(0, color.length - 1), 16);
    switch (direction) {
      case "R":
        cur_col += +len;
        break;
      case "L":
        cur_col -= +len;
        break;
      case "U":
        cur_row -= +len;
        break;
      case "D":
        cur_row += +len;
        break;

      default:
        break;
    }

    const first_point = last;
    const second_point = {
      row: cur_row,
      col: cur_col,
    };
    last = second_point;
    sum +=
      first_point.row * second_point.col - second_point.row * first_point.col;

    n += +len;
  }
  return Math.abs(sum) / 2 + 1 + n / 2;
}
