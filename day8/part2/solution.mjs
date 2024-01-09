import { store_path, extract_path, walk, starting_spot } from "./2.mjs";

import fs from "fs";

const filePath = "3.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");

const directions_map = store_path(fileContent);

const path = extract_path(fileContent);

console.log(walk(path, directions_map, starting_spot(fileContent)));
