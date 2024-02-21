export function extractWords(fileContent) {
  const lines = fileContent.split(",").map((val) => val.trim());
  const tables = [];
  for (const words of lines) {
    tables.push(words.trim());
  }
  return tables;
}

export function processInput(words) {
  const result = [];

  for (const word of words) {
    if (word.includes("=")) {
      const split = word.split("=");
      result.push({
        action: "add",
        idx: stringCode(split[0]),
        mark: split[0],
        focal_len: Number(split[1]),
      });
    } else {
      const split = word.split("-");
      result.push({
        action: "remove",
        idx: stringCode(split[0]),
        mark: split[0],
      });
    }
  }
  return result;
}

export function stringCode(word) {
  let result = 0;
  for (const char of word) {
    const base = result + char.charCodeAt(0);
    result = (base * 17) % 256;
  }
  return result;
}

export class Lens {
  #boxes = new Map();

  #add(idx, mark, focal_len) {
    if (!this.#boxes.has(idx)) {
      this.#boxes.set(idx, [
        {
          mark: mark,
          focal_len: focal_len,
        },
      ]);
      return;
    }
    const lens = this.#boxes.get(idx);

    const elem = lens.find((val) => val.mark == mark);
    if (!elem) {
      lens.push({
        mark: mark,
        focal_len: focal_len,
      });
      return;
    }
    elem.focal_len = focal_len;
  }
  #remove(idx, mark) {
    if (!this.#boxes.has(idx)) {
      return;
    }
    const lens = this.#boxes.get(idx);
    this.#boxes.set(
      idx,
      lens.filter((val) => val.mark != mark)
    );
  }

  process(record) {
    switch (record.action) {
      case "add":
        this.#add(record.idx, record.mark, record.focal_len);
        break;
      case "remove":
        this.#remove(record.idx, record.mark);
        break;

      default:
        break;
    }
  }

  #preComputePower() {
    const output_arr = Array.from(this.#boxes, ([idx, val]) => [
      idx + 1,
      val,
    ]).filter((val) => val[1].length > 0);
    return output_arr;
  }

  computePower() {
    const power_list = this.#preComputePower();
    let sum = 0;
    for (const elem of power_list) {
      const multiplier = elem[0];
      const lens = elem[1];
      for (let i = 0; i < lens.length; i++) {
        const idx_multiplier = i + 1;
        const focal_length = lens[i].focal_len;
        const focal_power = multiplier * idx_multiplier * focal_length;
        sum += focal_power;
      }
    }
    return sum;
  }
}
