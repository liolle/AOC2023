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

function popFirst(gap_map, idx) {
  if (gap_map.has(idx)) {
    const list = gap_map.get(idx);
    const res = list[0];
    const n_list = list.slice(1);
    if (n_list.length == 0) {
      gap_map.delete(idx);
    } else {
      gap_map.set(idx, n_list);
    }
    return res;
  }
  return undefined;
}

function processCol(table, gap_map, row, col) {
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

function processRow(table, gap_map, row, col) {
  switch (table[row][col]) {
    case ".":
      addGap(gap_map, col, row);
      break;
    case "O":
      const new_pos = popFirst(gap_map, row);
      if (new_pos != undefined) {
        table[row][col] = ".";
        table[row][new_pos] = "O";
        addGap(gap_map, col, row);
      }
      break;
    case "#":
      resetGap(gap_map, row);
      break;
    default:
      break;
  }
}

function tiltNorth(table) {
  const gap_map = new Map();
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      processCol(table, gap_map, i, j);
    }
  }
  return table;
}

function tiltWest(table) {
  const gap_map = new Map();
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      processRow(table, gap_map, i, j);
    }
  }
  return table;
}

function tiltSouth(table) {
  const gap_map = new Map();
  for (let i = table.length - 1; i >= 0; i--) {
    for (let j = 0; j < table[i].length; j++) {
      processCol(table, gap_map, i, j);
    }
  }
  return table;
}

function tiltEast(table) {
  const gap_map = new Map();
  for (let i = 0; i < table.length; i++) {
    for (let j = table[i].length; j >= 0; j--) {
      processRow(table, gap_map, i, j);
    }
  }
  return table;
}

export function markTable(table) {
  let mark = "";
  for (const row of table) {
    let tmp_mark = "";
    if (mark != "") {
      mark += "-";
    }

    for (let i = 0; i < row.length; i++) {
      if (row[i] == "O") {
        tmp_mark += String(i);
      }
    }

    mark += tmp_mark;
  }
  return mark;
}

/**
 *
 * @param {string[][]} table
 * @param {"north"|"east"|"south"|"west"} direction
 * @returns {string[][]}
 */
export function tiltTable(table, direction) {
  switch (direction) {
    case "north":
      return tiltNorth(table);
    case "east":
      return tiltEast(table);
    case "south":
      return tiltSouth(table);
    case "west":
      return tiltWest(table);
    default:
      return table;
  }
}

export function cycle(table) {
  for (const direction of ["north", "west", "south", "east"]) {
    tiltTable(table, direction);
  }
  return table;
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

export function cycleN(table, n) {
  const cache = new Map();

  for (let i = 0; i < n; i++) {
    const mark = markTable(table);
    if (cache.has(mark)) {
      const cycle_start = cache.get(mark).idx;

      const cycle_length = i - cycle_start;
      const loop_start = n - cycle_start;
      const loop_length = Number.parseInt(loop_start / cycle_length);
      const true_idx = loop_start - loop_length * cycle_length + cycle_start;

      return Array.from(cache, ([name, value]) => value).find(
        (val) => val.idx == true_idx
      ).load;
    }
    cache.set(mark, {
      idx: i,
      load: calculateLoad(table),
    });
    table = cycle(table);
  }
}
