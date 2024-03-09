function createEval(exp, ret) {
  const reg = /[<>]/;
  const [key, limit] = exp.split(reg);
  const delimiter = reg.exec(exp)[0];
  let func = null;
  switch (delimiter) {
    case ">":
      func = (input) => {
        if (input > Number(limit)) return ret;
        return undefined;
      };
      return {
        key: key,
        func: func,
      };
    case "<":
      func = (input) => {
        if (input < Number(limit)) return ret;
        return undefined;
      };
      return {
        key: key,
        func: func,
      };

    default:
      return undefined;
  }
}

function decodeEx(expression) {
  if (/^[a-zA-z]+$/.test(expression)) {
    return {
      key: "default",
      func: (input) => expression,
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

export function walk(input, map) {
  let cur = "in";

  while (cur != "R" && cur != "A") {
    const checks = map.get(cur);
    for (let condition of checks) {
      if (condition.key == "default") {
        cur = condition.func("");
        continue;
      }
      const val = input[condition.key];
      const res = condition.func(val);
      if (!res) continue;
      cur = res;
      break;
    }
  }
  return {
    sum: input.sum,
    accepted: cur == "A",
  };
}
