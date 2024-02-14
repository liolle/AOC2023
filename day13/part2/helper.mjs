const isPalindrome = (input_string) => {
  const input = input_string.split("");

  for (let i = 0; i < input.length; i++) {
    if (input[input.length - i - 1] != input[i]) return false;
  }
  return true;
};

function linesToTables(fileContent) {
  const lines = fileContent.split("\n").map((val) => val.trim());

  const tables = [];
  let tmp_table = [];
  for (const line of lines) {
    if (line == "") {
      tables.push(tmp_table);
      tmp_table = [];
    } else {
      tmp_table.push(line);
    }
  }
  if (tmp_table.length > 0) {
    tables.push(tmp_table);
  }

  return tables;
}

function intersect(l1, l2) {
  const res = [];
  const set = new Set();
  for (const elem of l2) {
    set.add(`I-${elem.index}`);
  }
  for (const elem of l1) {
    if (set.has(`I-${elem.index}`)) res.push(elem);
  }
  return res;
}

function intersectMultiple(idx_list) {
  let intersect_res = idx_list.pop() || [];

  while (idx_list.length > 0) {
    intersect_res = intersect(intersect_res, idx_list.pop());
  }
  return intersect_res;
}

function processTable(table) {
  const row_list = [];
  const col_list = [];

  for (let col = 0; col < table[0].length; col++) {
    let tmp_col = "";
    for (let row = 0; row < table.length; row++) {
      tmp_col += table[row][col];
    }
    col_list.push(palSub(tmp_col));
  }

  for (const line of table) {
    row_list.push(palSub(line));
  }

  const inter1 = intersectMultiple(row_list.map((val) => val.mirror_idx));
  const inter2 = intersectMultiple(col_list.map((val) => val.mirror_idx));

  return {
    table: table,
    mirror_row: inter1,
    mirror_col: inter2,
    direction: inter1.length > 0 ? "row" : "col",
  };
}

export function rowColString(fileContent) {
  const input_array = linesToTables(fileContent);
  const res = [];

  for (const elem of input_array) {
    res.push(processTable(elem));
  }
  return res;
}

export const palSub = (input_string) => {
  const input = input_string.split("");
  const targets = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = i; j < input.length; j++) {
      if ((i != 0 && j != input.length - 1) || i == j) continue;
      const target = input.slice(i, j + 1).join("");
      if (isPalindrome(target)) {
        targets.push({
          content: target,
          index: (j + i) / 2,
          len: target.length,
        });
      }
    }
  }
  targets.sort((a, b) => b.index - a.index);
  return {
    mirror_idx: targets,
    line: input_string,
  };
};

export function scan(tables) {
  const output = [];
  let x = 0;
  for (const elem of tables) {
    const current_table = elem.table;
    const set = new Set();
    set.add(elem.direction);
    let result = [];
    outer: for (let i = 0; i < current_table.length; i++) {
      const og_line = current_table[i].split("");

      inner: for (let j = 0; j < current_table[i].length; j++) {
        let line = current_table[i].split("");
        if (line[j] == "#") {
          line[j] = ".";
        } else {
          continue inner;
        }
        current_table[i] = line.join("");
        const res = processTable(current_table);
        const elem_row_set = new Set();
        const elem_col_set = new Set();

        for (const iterator of elem.mirror_row) {
          elem_row_set.add(iterator.index);
        }

        for (const iterator of elem.mirror_col) {
          elem_col_set.add(iterator.index);
        }

        res.mirror_col = res.mirror_col.filter(
          (val) => !elem_col_set.has(val.index)
        );

        res.mirror_row = res.mirror_row.filter(
          (val) => !elem_row_set.has(val.index)
        );

        if (res.mirror_col.length > 0 || res.mirror_row.length > 0) {
          result.push(res);
        }

        current_table[i] = og_line.join("");
      }
    }
    result.sort((a, b) => {
      if (elem.direction == "row") {
        if (b.mirror_row.length > 0 && a.mirror_row.length) {
          return b.mirror_row[0].index - a.mirror_row[0].index;
        } else if (b.mirror_row.length > 0) {
          return 1;
        } else if (a.mirror_row.length > 0) {
          return -1;
        }

        if (b.mirror_col.length > 0 && a.mirror_col.length) {
          return b.mirror_col[0].len - a.mirror_col[0].len;
        } else if (b.mirror_col.length > 0) {
          return 1;
        } else if (a.mirror_col.length > 0) {
          return -1;
        }
      }

      if (elem.direction == "col") {
        if (b.mirror_col.length > 0 && a.mirror_col.length) {
          return b.mirror_col[0].index - a.mirror_col[0].index;
        } else if (b.mirror_col.length > 0) {
          return 1;
        } else if (a.mirror_col.length > 0) {
          return -1;
        }
        if (b.mirror_row.length > 0 && a.mirror_row.length) {
          return b.mirror_row[0].len - a.mirror_row[0].len;
        } else if (b.mirror_row.length > 0) {
          return 1;
        } else if (a.mirror_row.length > 0) {
          return -1;
        }
      }

      return 0;
    });

    if (result.length > 0) {
      output.push(result[0]);
    }
  }

  return output;
}
