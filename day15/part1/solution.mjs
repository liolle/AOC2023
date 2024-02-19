import {} from "./helper.mjs";

import fs from "fs";
import { extractWords, stringCode } from "./helper.mjs";
const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");

const words = extractWords(fileContent);
console.log(
  words.map((val) => stringCode(val)).reduce((acc, cur) => (acc += cur))
);
