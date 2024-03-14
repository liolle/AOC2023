function createEval(exp, ret) {
  const reg = /[<>]/;
  const [key, limit] = exp.split(reg);
  const delimiter = reg.exec(exp)[0];
  switch (delimiter) {
    case ">":
      return {
        key: key,
        ret: ret,
        limit: limit,
        operator: "greater",
      };
    case "<":
      return {
        key: key,
        ret: ret,
        limit: limit,
        operator: "smaller",
      };

    default:
      return undefined;
  }
}

function decodeEx(expression) {
  if (/^[a-zA-z]+$/.test(expression)) {
    return {
      key: expression,
      limit: null,
      operator: null,
    };
  }
  const [condition, ret] = expression.split(":");
  return createEval(condition, ret);
}

function translate(input) {
  const [key, expression] = input.slice(0, -1).split("{");
  const wf = [];

  for (let exp of expression.split(",")) {
    const ev = decodeEx(exp);
    wf.push(ev);
  }
  return {
    key: key,
    workflow: wf,
  };
}

export function createMap(expressionList) {
  const map = new Map();

  for (let exp of expressionList) {
    const t_exp = translate(exp);
    map.set(t_exp.key, t_exp.workflow);
  }
  return map;
}

function splitRange(node, map) {
  const key_map = map.get(node.key);
  const directions = key_map[node.idx];
  let pivot = directions.limit;

  if (!pivot) {
    return [
      {
        key: directions.key,
        idx: 0,
        ranges: node.ranges,
      },
    ];
  }
  const range = node.ranges[directions.key];
  pivot = Number(pivot);

  const res = [];

  const r1 = {
    key: node.key,
    idx: node.idx + 1,
    ranges: { ...node.ranges },
  };
  const r2 = {
    key: node.key,
    idx: node.idx + 1,
    ranges: { ...node.ranges },
  };

  switch (directions.operator) {
    case "greater":
      if (pivot + 1 < range[1])
        r2.ranges[directions.key] = [pivot + 1, range[1]];
      else r2.ranges[directions.key] = [range[1], pivot];

      if (range[0] < pivot) r1.ranges[directions.key] = [range[0], pivot];
      else r1.ranges[directions.key] = [pivot, range[0]];
      r2.idx = 0;
      r2.key = directions.ret;
      break;
    case "smaller":
      if (range[0] < pivot - 1)
        r1.ranges[directions.key] = [range[0], pivot - 1];
      else r1.ranges[directions.key] = [pivot, range[0]];

      if (pivot < range[1]) r2.ranges[directions.key] = [pivot, range[1]];
      else r2.ranges[directions.key] = [range[1], pivot];
      r1.idx = 0;
      r1.key = directions.ret;
      break;

    default:
      break;
  }

  for (let el of [r1, r2]) {
    res.push(el);
  }
  return res;
}

export function walk(map) {
  const queue = [
    {
      key: "in",
      idx: 0,
      ranges: {
        x: [1, 4000],
        m: [1, 4000],
        a: [1, 4000],
        s: [1, 4000],
      },
      last: "",
    },
  ];
  const accepted = [];
  const rejected = [];

  while (queue.length > 0) {
    const node = queue.pop();
    if (node.key == "A" || node.key == "R") {
      if (node.key == "A") accepted.push(node.ranges);
      continue;
    }

    const nb = splitRange(node, map);
    for (let el of nb) {
      queue.push(el);
    }
  }
  return [accepted, rejected];
}
