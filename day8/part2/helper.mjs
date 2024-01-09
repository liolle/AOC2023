export const extract_path = (document) => {
  const slit_document = document.split("\n");
  return slit_document[0].trim().split("");
};

export const store_path = (document) => {
  const slit_document = document.split("\n");

  const map = new Map();

  for (const line of slit_document) {
    const regex = /[A-Z0-9]{3} =/;
    if (regex.test(line)) {
      const key_split = line.split("=");
      const key = key_split[0].trim();
      const direction = key_split[1]
        .trim()
        .split(",")
        .map((val) => val.replace("(", "").replace(")", ""));

      const dir = {
        L: direction[0].trim(),
        R: direction[1].trim(),
      };
      map.set(key, dir);
    }
  }
  return map;
};

export const starting_spot = (document) => {
  const slit_document = document.split("\n");
  const starting = [];

  for (const line of slit_document) {
    const regex = /.{2}A =/;
    if (regex.test(line)) {
      const key_split = line.split("=");
      const key = key_split[0].trim();
      starting.push(key);
    }
  }
  return starting;
};

export const single_walk = (path, directions, current_spot) => {
  let idx = 0;
  let count = 0;
  const regex = /[A-Z0-9]Z/;

  while (!regex.test(current_spot)) {
    current_spot = directions.get(current_spot)[path[idx]];
    idx = (idx + 1) % path.length;
    count++;
  }
  return count;
};

const full_modulo = (array, number) => {
  for (let elem of array) {
    if (number % elem != 0) return false;
  }
  return true;
};

export const walk = (path, directions, spots) => {
  const LCM_MAP = [];

  for (let i = 0; i < spots.length; i++) {
    LCM_MAP.push(single_walk(path, directions, spots[i]));
  }

  LCM_MAP;

  LCM_MAP.sort((a, b) => a - b);

  let multiple = LCM_MAP[LCM_MAP.length - 1];

  while (!full_modulo(LCM_MAP, multiple)) {
    multiple += LCM_MAP[LCM_MAP.length - 1];
  }

  console.log(multiple);
};
