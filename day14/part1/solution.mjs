import {} from "./helper.mjs";

import fs from "fs";
import { tiltNorth, extractTable, calculateLoad } from "./helper.mjs";
const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");
const table = extractTable(fileContent);
const tiled_table = tiltNorth(table);

const pretty_tilted_table = tiled_table.reduce(
  (acc, cur) => acc + `${cur.join("")}\n`,
  ""
);

console.log(pretty_tilted_table);
console.log(calculateLoad(tiled_table));
