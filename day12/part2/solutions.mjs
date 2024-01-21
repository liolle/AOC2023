import { walk } from "./helper.mjs";
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

const unfolded_inputs = inputs.map((val) => {
  let unfolded_str = "";
  const unfolded_arr = [];

  for (let i = 0; i < 5; i++) {
    unfolded_arr.push(val[1]);
    unfolded_str += unfolded_str == "" ? val[0] : `?${val[0]}`;
  }

  return [unfolded_str, unfolded_arr.flat()];
});

let sum = 0;
let i = 0;
for (const input of unfolded_inputs) {
  const x = walk(input[0], input[1]);
  sum += x;
}
console.log("SUM", sum);
