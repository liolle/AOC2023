import { computeArea } from "./helper.mjs";

import fs from "fs";
import {} from "./helper.mjs";
const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");
const area = computeArea(fileContent);
console.log(area);
