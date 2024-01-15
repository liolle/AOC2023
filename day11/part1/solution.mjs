import { exit } from "process";
import { input_to_array, transform_table, soft_scan } from "./helper.mjs";

import fs from "fs";

const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");

const table = input_to_array(fileContent);

const t_table = transform_table(table);

const scan_map = soft_scan(t_table);

console.log(scan_map.reduce((acc, val) => acc + val.distance, 0));
