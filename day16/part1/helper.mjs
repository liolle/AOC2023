export function extractTable(fileContent) {
  const lines = fileContent.split("\n").map((val) => val.trim());
  const tables = [];
  for (const line of lines) {
    tables.push(line.split(""));
  }
  return tables;
}

/**
 * @param {string[][]} table
 * @param {{row:string,col:string,direction:"north"|"east"|"south"|"west"}} node
 * @returns {boolean}
 */
function isInbound(table, node) {
  return (
    node.row >= 0 &&
    node.row < table.length &&
    node.col >= 0 &&
    node.col < table[0].length
  );
}
/**
 *
 * @param {{row:string,col:string,direction:"north"|"east"|"south"|"west"}} node
 * @param {"north"|"east"|"south"|"west"} direction
 * @returns {{row:string,col:string,direction:"north"|"east"|"south"|"west"}|null}
 */
function getNextNode(table, node, direction) {
  console.log, (node, direction, "**");
  let new_pos = null;
  switch (direction) {
    case "north":
      new_pos = {
        row: node.row - 1,
        col: node.col,
        direction: direction,
      };
      if (!isInbound(table, new_pos)) {
        return null;
      }
      return new_pos;
    case "east":
      new_pos = {
        row: node.row,
        col: node.col + 1,
        direction: direction,
      };
      if (!isInbound(table, new_pos)) {
        return null;
      }
      return new_pos;
    case "south":
      new_pos = {
        row: node.row + 1,
        col: node.col,
        direction: direction,
      };
      if (!isInbound(table, new_pos)) {
        return null;
      }
      return new_pos;
    case "west":
      new_pos = {
        row: node.row,
        col: node.col - 1,
        direction: direction,
      };
      if (!isInbound(table, new_pos)) {
        return null;
      }
      return new_pos;

    default:
      return null;
  }
}

/**
 * @param {string[][]} table
 * @param {{row:string,col:string,direction:"north"|"east"|"south"|"west"}} node
 * @returns {{row:string,col:string,direction:"north"|"east"|"south"|"west"}[]}
 */
function getNeighbors(table, node) {
  // |, \, -, /,
  const cell = table[node.row][node.col];
  const direction = node.direction;
  switch (cell) {
    case "|":
      if (direction == "north" || direction == "south") {
        const nbs = [];
        const nb1 = getNextNode(table, node, direction);
        if (nb1 != null) {
          nbs.push(nb1);
        }
        return nbs;
      } else {
        const nbs = [];
        const nb1 = getNextNode(table, node, "north");
        const nb2 = getNextNode(table, node, "south");
        if (nb1 != null) {
          nbs.push(nb1);
        }

        if (nb2 != null) {
          nbs.push(nb2);
        }
        return nbs;
      }
    case "\\":
      if (direction == "north") {
        const nbs = [];
        const nb1 = getNextNode(table, node, "west");
        if (nb1 != null) {
          nbs.push(nb1);
        }
        return nbs;
      } else if (direction == "south") {
        const nbs = [];
        const nb1 = getNextNode(table, node, "east");
        if (nb1 != null) {
          nbs.push(nb1);
        }
        return nbs;
      } else if (direction == "east") {
        const nbs = [];
        const nb1 = getNextNode(table, node, "south");
        if (nb1 != null) {
          nbs.push(nb1);
        }
        return nbs;
      } else if (direction == "west") {
        const nbs = [];
        const nb1 = getNextNode(table, node, "north");
        if (nb1 != null) {
          nbs.push(nb1);
        }
        return nbs;
      }

    case "-":
      if (direction == "east" || direction == "west") {
        const nbs = [];
        const nb1 = getNextNode(table, node, direction);
        if (nb1 != null) {
          nbs.push(nb1);
        }
        return nbs;
      } else {
        const nbs = [];
        const nb1 = getNextNode(table, node, "east");
        const nb2 = getNextNode(table, node, "west");
        if (nb1 != null) {
          nbs.push(nb1);
        }

        if (nb2 != null) {
          nbs.push(nb2);
        }
        return nbs;
      }
    case "/":
      if (direction == "north") {
        const nbs = [];
        const nb1 = getNextNode(table, node, "east");
        if (nb1 != null) {
          nbs.push(nb1);
        }
        return nbs;
      } else if (direction == "south") {
        const nbs = [];
        const nb1 = getNextNode(table, node, "west");
        if (nb1 != null) {
          nbs.push(nb1);
        }
        return nbs;
      } else if (direction == "east") {
        const nbs = [];
        const nb1 = getNextNode(table, node, "north");
        if (nb1 != null) {
          nbs.push(nb1);
        }
        return nbs;
      } else if (direction == "west") {
        const nbs = [];
        const nb1 = getNextNode(table, node, "south");
        if (nb1 != null) {
          nbs.push(nb1);
        }
        return nbs;
      }

    default:
      const nbs = [];
      const nb1 = getNextNode(table, node, direction);
      if (nb1 != null) {
        nbs.push(nb1);
      }
      return nbs;
  }
}

export function walk(table) {
  const queue = [];
  const visited = new Set();

  queue.push({
    row: 0,
    col: 0,
    direction: "east",
  });

  while (queue.length > 0) {
    const node = queue.pop();
    visited.add(`${node.row}-${node.col}.${node.direction}`);
    const neighbors = getNeighbors(table, node);
    for (const neighbor of neighbors) {
      if (
        !visited.has(`${neighbor.row}-${neighbor.col}.${neighbor.direction}`)
      ) {
        queue.push(neighbor);
      }
    }
  }

  const cp_table = [...table];

  for (let i = 0; i < cp_table.length; i++) {
    for (let j = 0; j < cp_table.length; j++) {
      cp_table[i][j] = ".";
    }
  }
  let count = 0;

  visited.forEach((val) => {
    const pos = val
      .split(".")[0]
      .split("-")
      .map((val) => Number(val));
    if (cp_table[pos[0]][pos[1]] != "#") count++;
    cp_table[pos[0]][pos[1]] = "#";
  });

  let res = "";

  for (const row of cp_table) {
    res += row.reduce((acc, cur) => acc + cur, "") + "\n";
  }

  console.log(res);

  return count;
}
