import {} from "./helper.mjs";

import fs from "fs";
import { extractWords, stringCode, processInput, Lens } from "./helper.mjs";
const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");
const words = extractWords(fileContent);
const lens = new Lens();
const records = processInput(words);

for (const record of records) {
  lens.process(record);
}

console.log(lens.computePower());
