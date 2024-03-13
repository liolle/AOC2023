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
  const range = node.range;
  const key_map = map.get(node.key);
  console.log(key_map, node.key);
  const directions = key_map[node.idx];
  let pivot = directions.limit;

  if (!pivot) {
    return [
      {
        key: directions.key,
        idx: node.idx + 1,
        range: node.range,
      },
    ];
  }
  pivot = Number(pivot);

  const res = [];

  const r1 = {
    key: directions.key,
    idx: node.idx + 1,
    range: [range[0], pivot],
  };
  const r2 = {
    key: directions.key,
    idx: node.idx + 1,
    range: [pivot, range[1]],
  };

  switch (directions.operator) {
    case "greater":
      r2.range = [pivot + 1, range[1]];
      r2.idx = 0;
      r2.key = directions.ret;
      break;
    case "smaller":
      r1.idx = 0;
      r1.key = directions.ret;
      r1.range = [range[0], pivot - 1];
      break;

    default:
      break;
  }

  for (let el of [r1, r2]) {
    if (el.range[0] < el.range[1]) res.push(el);
  }
  console.log(res);
  return res;
}

export function validate(input, map) {
  const queue = [
    {
      key: "in",
      idx: 0,
      range: [1, 4000],
    },
  ];
  while (queue.length > 0) {
    const node = queue.pop();
    console.log(node);
    if (node.key == "A" || node.key == "R") {
      console.log(node);
      continue;
    }

    const nb = splitRange(node, map);

    for (let el of nb) {
      queue.push(el);
    }
  }
}
