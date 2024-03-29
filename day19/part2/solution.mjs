import fs from "fs";
import { createMap, walk } from "./helper.mjs";
const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");

function getData(fileContent) {
  const map_data = [];
  const input_data = [];
  let input = false;
  const data = fileContent.split("\r\n");
  for (let el of data) {
    if (el == "") {
      input = true;
      continue;
    }
    if (input) {
      input_data.push(el);
    } else {
      map_data.push(el);
    }
  }
  return {
    map_data: map_data,
    input_data: input_data,
  };
}

function extractInput(input_data) {
  const out_keys = [];
  for (let input of input_data) {
    const keys = input.slice(1, -1).split(",");
    const input_line = {};
    input_line.sum = 0;
    for (let el of keys) {
      const [key, value] = el.split("=");
      input_line[key] = Number(value);
      input_line.sum += Number(value);
    }
    out_keys.push(input_line);
  }
  return out_keys;
}

const data = getData(fileContent);
const t_input = extractInput(data.input_data);
const map = createMap(data.map_data);

let sum = 0;

const res = walk(map)[0];
for (let el of res) {
  const x = el.x[1] - el.x[0] + 1;
  const m = el.m[1] - el.m[0] + 1;
  const a = el.a[1] - el.a[0] + 1;
  const s = el.s[1] - el.s[0] + 1;
  sum += x * m * a * s;
}

console.log(sum);
