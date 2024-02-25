import { extractTable, getStartList, walk } from "./helper.mjs";

import fs from "fs";
import {} from "./helper.mjs";
const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");
const table = extractTable(fileContent);

const starter = getStartList(table);

let max = 0;
for (const start of starter) {
  const current = walk(table, start);
  max = Math.max(max, current);
}
console.log(max);
