export const extract_seeds = (raw_src) => {
  let tmp = raw_src.split(":")[1].trim();

  let seeds = tmp
    .split(" ")
    .map((val) => Number(val))
    .filter((val) => !isNaN(val));

  return seeds;
};

export const extract_ranges = (raw_section) => {
  const lines = raw_section.split("\n").map((val) => val.trim());

  const ranges = [];

  for (let line of lines) {
    let range_items = line.split(" ").map((val) => Number(val));
    ranges.push({
      start: range_items[1],
      end: range_items[1] + range_items[2] - 1,
      tr_start: range_items[0],
      tr_end: range_items[0] + range_items[2] - 1,
    });
  }

  ranges.sort((a, b) => a.start - b.start);
  return ranges;
};

export const seed_to_range = (seeds) => {
  const seed_range = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seed_range.push({
      start: +seeds[i],
      end: seeds[i] + seeds[i + 1] - 1,
    });
  }
  return seed_range;
};

const process_range = (src_range, dst_range) => {
  const ranges = [];
  if (src_range.start < dst_range.start) {
    if (src_range.end < dst_range.start) {
      ranges.push(src_range);
    } else if (src_range.end <= dst_range.end) {
      ranges.push({
        ...src_range,
        start: src_range.start,
        end: dst_range.start - 1,
      });
      ranges.push({
        ...src_range,
        start: dst_range.start,
        end: src_range.end,
      });
    } else {
      ranges.push({
        ...src_range,
        start: src_range.start,
        end: dst_range.start - 1,
      });
      ranges.push({
        ...src_range,
        start: dst_range.start,
        end: dst_range.end,
      });
      ranges.push({
        ...src_range,
        start: dst_range.end + 1,
        end: src_range.end,
      });
    }
  } else {
    if (src_range.start > dst_range.end) {
      ranges.push(src_range);
    } else if (src_range.end <= dst_range.end) {
      ranges.push({
        ...src_range,
        start: src_range.start,
        end: src_range.end,
      });
    } else {
      ranges.push({
        ...src_range,
        start: src_range.start,
        end: dst_range.end,
      });
      ranges.push({
        ...src_range,
        start: dst_range.end + 1,
        end: src_range.end,
      });
    }
  }

  return ranges;
};

const single_spread_ranges = (src_range, dst_ranges) => {
  const ranges = new Map();

  for (let range of dst_ranges) {
    const tmp_range = process_range(src_range, range);

    for (let rg of tmp_range) {
      ranges.set(`${rg.start}-${rg.end}`, rg);
    }
  }

  const rgs = [];

  for (let key of ranges.keys()) {
    let _,
      value = key;

    const rg = value
      .split("-")
      .map((val) => Number(val))
      .filter((val) => !isNaN(val));

    rgs.push(rg);
  }

  rgs.sort((a, b) => {
    if (a[0] - b[0] == 0) return a[1] - b[1];
    return a[0] - b[0];
  });

  const tmp_arr = [];

  let current = rgs[0][0];
  tmp_arr.push(rgs[0]);
  for (let i = 1; i < rgs.length; i++) {
    if (rgs[i][0] != current) {
      current = rgs[i][0];
      tmp_arr.push(rgs[i]);
    }
  }

  const tmp_map = new Map();

  for (let x of tmp_arr) {
    tmp_map.set(`${x[0]}-${x[1]}`, true);
  }

  return Array.from(ranges, ([name, value]) => value).filter(
    (val) => !!tmp_map.get(`${val.start}-${val.end}`)
  );
};

const map = (src_range, dest_ranges) => {
  for (let range of dest_ranges) {
    if (src_range.start >= range.start && src_range.start <= range.end) {
      if (!src_range.path) {
        return {
          start: range.tr_start + src_range.start - range.start,
          end: range.tr_end + src_range.end - range.end,
          path: [`${src_range.start}-${src_range.end}`],
        };
      }
      src_range.path.push(`${src_range.start}-${src_range.end}`);

      return {
        start: range.tr_start + src_range.start - range.start,
        end: range.tr_end + src_range.end - range.end,
        path: src_range.path,
      };
    }
  }

  return src_range;
};

const spread_ranges = (src_ranges, dst_ranges) => {
  let ranges = [];

  for (let range of src_ranges) {
    single_spread_ranges(range, dst_ranges).map((val) => {
      ranges.push(map(val, dst_ranges));
      return 1;
    });
  }

  return ranges;
};

export const traverse = (initial_ranges, dst_list) => {
  let current = initial_ranges;

  for (const map of dst_list) {
    current = spread_ranges(current, map);
  }

  current.sort((a, b) => a.start - b.start);

  return current[0].start;
};
