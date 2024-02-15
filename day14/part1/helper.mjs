export function extractTable(fileContent) {
  const lines = fileContent.split("\n").map((val) => val.trim());
  const tables = [];
  for (const line of lines) {
    tables.push(line.split(""));
  }
  return tables;
}

function addGap(gap_map, row, col) {
  if (gap_map.has(col)) {
    const list = gap_map.get(col);
    list.push(row);
  } else {
    gap_map.set(col, [row]);
  }
}

function resetGap(gap_map, col) {
  gap_map.delete(col);
}

function popFirst(gap_map, col) {
  if (gap_map.has(col)) {
    const list = gap_map.get(col);
    const res = list[0];
    const n_list = list.slice(1);
    if (n_list.length == 0) {
      gap_map.delete(col);
    } else {
      gap_map.set(col, n_list);
    }
    return res;
  }
  return undefined;
}

function processPos(table, gap_map, row, col) {
  switch (table[row][col]) {
    case ".":
      addGap(gap_map, row, col);
      break;
    case "O":
      const new_pos = popFirst(gap_map, col);
      if (new_pos != undefined) {
        table[row][col] = ".";
        table[new_pos][col] = "O";
        addGap(gap_map, row, col);
      }
      break;
    case "#":
      resetGap(gap_map, col);
      break;
    default:
      break;
  }
}

export function tiltNorth(table) {
  const cp_table = [...table];
  const gap_map = new Map();
  for (let i = 0; i < cp_table.length; i++) {
    for (let j = 0; j < cp_table[i].length; j++) {
      processPos(cp_table, gap_map, i, j);
    }
  }
  return cp_table;
}

export function calculateLoad(table) {
  let sum = 0;

  let multiplier = table.length;
  for (const row of table) {
    const rocks = row.reduce((acc, cur) => {
      if (cur == "O") {
        return acc + 1;
      }
      return acc;
    }, 0);
    sum += multiplier * rocks;
    multiplier--;
  }

  return sum;
}
