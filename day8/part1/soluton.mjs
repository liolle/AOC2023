import { store_path, extract_path, walk } from "./helper.mjs";

import fs from "fs";

const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");

const directions_map = store_path(fileContent);

const path = extract_path(fileContent);

console.log(walk(path, directions_map));
