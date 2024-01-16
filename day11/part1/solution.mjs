import { exit } from "process";
import { inputToArray, transformTable, softScan } from "./helper.mjs";

import fs from "fs";

const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");

const table = inputToArray(fileContent);

const t_table = transformTable(table);

const scan_map = softScan(t_table);

console.log(scan_map.reduce((acc, val) => acc + val.distance, 0));
