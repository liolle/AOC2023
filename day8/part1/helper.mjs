export const extract_path = (document) => {
  const slit_document = document.split("\n");
  return slit_document[0].trim().split("");
};

export const store_path = (document) => {
  const slit_document = document.split("\n");

  const map = new Map();

  for (const line of slit_document) {
    const regex = /[A-Z]{3} =/;
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

export const walk = (path, directions) => {
  let idx = 0;
  let current_spot = "AAA";
  let count = 0;

  while (current_spot != "ZZZ") {
    current_spot = directions.get(current_spot)[path[idx]];
    idx = (idx + 1) % path.length;
    count++;
  }
  return count;
};
