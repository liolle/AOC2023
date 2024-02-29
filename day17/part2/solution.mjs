import { extractTable, walk } from "./helper.mjs";

import fs from "fs";
import {} from "./helper.mjs";
const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");
const table = extractTable(fileContent);

// console.log(walk(table));

const tab = [4, 3, 2, 7, 8, 2, 3, 1];

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  const result = [];

  function cascade(idx) {
    if (nums[idx] === true) {
      return;
    }
    const next = nums[idx] - 1;
    nums[idx] = true;
    cascade(next);
  }

  for (let idx in nums) {
    const t_idx = nums[idx] - 1;
    if (nums[t_idx] !== true) {
      cascade(t_idx);
    }
  }

  for (let idx in nums) {
    if (nums[idx] !== true) {
      result.push(+idx + 1);
    }
  }
  return result;
};

const map = new Map();

map.set(5, "b");
map.set(6, "c");
map.set(7, "x");
Array.from(map).map(([key, val]) => {
  console.log(val);
});
