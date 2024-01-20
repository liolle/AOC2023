import { BFS } from "./helper.mjs";
import fs from "fs";

const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");

const inputs = fileContent.split("\n").map((val) => {
  const [state, constraint] = val.split(" ");
  return [
    state.trim(),
    constraint
      .trim()
      .split(",")
      .map((val) => Number(val)),
  ];
});

let sum = 0;
for (const input of inputs) {
  sum += BFS.walk(input[0], input[1]).size;
}

console.log(sum);
