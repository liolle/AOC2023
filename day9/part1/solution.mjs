import { sum_last } from "./helper.mjs";

import fs from "fs";
const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");

const lines = fileContent.split("\n").map((val) =>
  val
    .trim()
    .split(" ")
    .map((val) => Number(val))
);

console.log(sum_last(lines));
