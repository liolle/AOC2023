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
  for (const elem of l1) {
    if (l2.includes(elem)) res.push(elem);
  }
  return res;
}

function intersectMultiple(idx_list) {
  let intersect_res = idx_list.pop() || [];

  while (idx_list.length > 0) {
    intersect_res = intersect(intersect_res, idx_list.pop());
  }
  return intersect_res.map((val) => Number.parseInt(val));
}

export function rowColString(fileContent) {
  const input_array = linesToTables(fileContent);
  const res = [];

  for (const elem of input_array) {
    const row_list = [];
    const col_list = [];

    for (let col = 0; col < elem[0].length; col++) {
      let tmp_col = "";
      for (let row = 0; row < elem.length; row++) {
        tmp_col += elem[row][col];
      }
      col_list.push(palSub(tmp_col));
    }

    for (const line of elem) {
      row_list.push(palSub(line));
    }

    res.push({
      table: elem,
      mirror_row: intersectMultiple(row_list.map((val) => val.mirror_idx)),
      mirror_col: intersectMultiple(col_list.map((val) => val.mirror_idx)),
    });
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
      if (isPalindrome(target))
        targets.push({
          content: target,
          index: (j + i) / 2,
        });
    }
  }
  return {
    mirror_idx: targets.map((val) => val.index),
    line: input_string,
  };
};
