import { buildTable, extractData, prettyTable, fillTable } from "./helper.mjs";

import fs from "fs";
import {} from "./helper.mjs";
const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");
const vertex = extractData(fileContent);
const table = buildTable(vertex);
console.log(vertex);
console.log(fillTable(table));
console.log(prettyTable(table));
