import {
  extract_seeds,
  extract_ranges,
  seed_to_range,
  traverse,
} from "./2.mjs";

import fs from "fs";

const file = process.argv[2];
if (!file) {
  console.log("Require input file");
  exit(0);
}

const fileContent = fs.readFileSync(file, "utf-8");

const parts = fileContent.split(/[a-z]+-[a-z]+-[a-z]+ map:/);

const seeds = extract_seeds(parts[0]);

const seeds_range = seed_to_range(seeds);

const soil_ranges = extract_ranges(parts[1].trim());
const fertilizer_ranges = extract_ranges(parts[2].trim());
const water_ranges = extract_ranges(parts[3].trim());
const light_ranges = extract_ranges(parts[4].trim());
const temperature_ranges = extract_ranges(parts[5].trim());
const humidity_ranges = extract_ranges(parts[6].trim());
const location_ranges = extract_ranges(parts[7].trim());

const dst_list = [
  soil_ranges,
  fertilizer_ranges,
  water_ranges,
  light_ranges,
  temperature_ranges,
  humidity_ranges,
  location_ranges,
];

console.log(traverse(seeds_range, dst_list));
