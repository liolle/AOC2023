import fs from "fs";
import { palSub, scan, rowColString } from "./helper.mjs";
const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");

const info = rowColString(fileContent);
const scanned_info = scan(info);

let sum = 0;

for (const elem of scanned_info) {
  if (elem.mirror_row.length > 0) {
    const add = elem.mirror_row[0].index % 1 == 0 ? 0 : 1;
    const plus = parseInt(elem.mirror_row[0].index) + add;
    sum += plus;
  }
  if (elem.mirror_col.length > 0) {
    const add = elem.mirror_col[0].index % 1 == 0 ? 0 : 1;
    const plus = (parseInt(elem.mirror_col[0].index) + add) * 100;
    sum += plus;
  }
}
console.log(sum);
