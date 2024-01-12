import { walk } from "./helper.mjs";

import fs from "fs";

const filePath = "2.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");

console.log(walk(fileContent));
