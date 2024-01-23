import {} from "./helper.mjs";

import fs from "fs";
import { rowColString } from "./helper.mjs";
const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");

const info = rowColString(fileContent);

let sum = 0;

for (const elem of info) {
  if (elem.mirror_row.length > 0) sum += elem.mirror_row[0] + 1;

  if (elem.mirror_col.length > 0) sum += (elem.mirror_col[0] + 1) * 100;
}
console.log(sum);
