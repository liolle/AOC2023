const fs = require("fs");

// const filePath = "test3.txt";
const filePath = "input1.txt";

const fileContent = fs.readFileSync(filePath, "utf-8");

const map = fileContent.split("\n");

const getN = (node, map, diag) => {
  const neighbor = [];

  let base_points = [
    { row: -1, col: 0, side: "left" },
    { row: 0, col: -1, side: "left" },
    { row: 1, col: 0, side: "right" },
    { row: 0, col: 1, side: "right" },
  ];

  if (diag) {
    base_points.push({ row: -1, col: -1, side: "left" });
    base_points.push({ row: 1, col: -1, side: "left" });
    base_points.push({ row: 1, col: 1, side: "left" });
    base_points.push({ row: -1, col: 1, side: "left" });
  }

  for (point of base_points) {
    const n = {
      row: node.row + point.row,
      col: node.col + point.col,
      side: point.side,
    };

    if (
      n.row >= 0 &&
      n.row < map.length &&
      n.col >= 0 &&
      n.col < map[n.row].length
    ) {
      neighbor.push(n);
    }
  }
  return neighbor;
};

const explore = (visited, map, node) => {
  let number = "";
  const queue = [];
  if (visited.get(`${node.row}-${node.col}`) || isNaN(map[node.row][node.col]))
    return number;

  queue.push(node);

  while (queue.length > 0) {
    const current = queue.pop();
    visited.set(`${current.row}-${current.col}`, true);
    if (current.side == undefined || current.side == "right") {
      number += map[current.row][current.col];
    } else {
      number = map[current.row][current.col] + number;
    }

    const neighbor = getN(current, map);

    for (point of neighbor) {
      if (
        !isNaN(map[point.row][point.col]) &&
        !visited.get(`${point.row}-${point.col}`)
      ) {
        queue.push(point);
      }
    }
  }
  return number;
};

const visit = (map) => {
  const visited = new Map();
  let numbers = 0;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const char = map[i][j];
      if (char == "*") {
        const neighbor = getN(
          {
            row: i,
            col: j,
          },
          map,
          true
        );

        const ratio = [];

        for (const n of neighbor) {
          const res = explore(visited, map, {
            row: n.row,
            col: n.col,
          });

          if (res != "" && res != "/n") {
            ratio.push(res);
          }
        }

        if (ratio.length == 2) {
          console.log("-->", char, ratio);
          numbers += Number(ratio[0]) * Number(ratio[1]);
        }
      }
    }
  }

  console.log(numbers);
};

visit(map);
