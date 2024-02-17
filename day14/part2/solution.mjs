import {} from "./helper.mjs";

import fs from "fs";
import {
  tiltTable,
  extractTable,
  calculateLoad,
  cycle,
  cycleN,
} from "./helper.mjs";
const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");
const table = extractTable(fileContent);
let cycle_table = table;

console.log(cycleN(cycle_table, 1000000000));
