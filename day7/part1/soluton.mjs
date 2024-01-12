import { raw_hands_to_hands } from "./helper.mjs";

import fs from "fs";

const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");

const matching_card = new Map();

matching_card.set("2", 2);
matching_card.set("3", 3);
matching_card.set("4", 4);
matching_card.set("5", 5);
matching_card.set("6", 6);
matching_card.set("7", 7);
matching_card.set("8", 8);
matching_card.set("9", 9);
matching_card.set("T", 10);
matching_card.set("J", 11);
matching_card.set("Q", 12);
matching_card.set("K", 13);
matching_card.set("A", 14);

console.log(raw_hands_to_hands(fileContent.trim(), matching_card));
