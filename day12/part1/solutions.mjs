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
let i = 0;
for (const input of inputs) {
  sum += BFS.walk(input[0], input[1]).size;
  console.log(++i);
}

console.log(sum);
// console.log(BFS.walk(inputs[4][0], inputs[4][1]));
// console.log(
//   "???#???##?????###?.".split("").reduce((acc, current) => {
//     if (current == "#") return acc + 1;
//     return acc;
//   }, 0)
// );
