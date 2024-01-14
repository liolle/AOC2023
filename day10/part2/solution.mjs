import { walk } from "./helper.mjs";

import fs from "fs";
const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");

console.log(walk(fileContent));
