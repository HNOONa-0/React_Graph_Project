// returns a 2 dimensional vector rows by cols & all entries are 0
// 0 is for bugs or someting
// val1 = 1 -> [], val1 = 2 -> set, val1 = 3 -> i, val1 = 4 -> 0
// val2 = 1 -> 0, val2 = 2 -> [], neiher -> object

import {
  maxDemos,
  maxDemoLines,
  minDemos,
  minDemoLines,
  maxNodeLen,
  maxWeightLen,
} from "./limits";

export const setV2d = (rows, cols, val1 = 1, val2 = 1) => {
  let v2d = [];
  for (let i = 0; i < rows; i++) {
    let v = val1 === 1 ? [] : val1 === 2 ? new Set() : val1 === 3 ? i : 0;
    for (let j = 0; j < cols; j++)
      v.push(val2 === 1 ? 0 : val2 === 2 ? [] : { ...val2 });
    v2d.push(v);
  }
  return v2d;
};
export const randomNumberGenerator = (a, b) => {
  return a + Math.floor(Math.random() * (b - a + 1));
};
export const makeDemos = (n = randomNumberGenerator(minDemos, maxDemos)) => {
  let demos = [
    "1 2\n2 3\n3 4\n4 5\n5 6\n6 8\n6 9\n",
    "1 2\n2 3\n1 4\n4 5\n1 6\n6 7\n",
    "1 2\n1 3\n1 4\n2 5\n2 6\n4 7\n4 8\n6 9\n6 10\n8 11\n8 12\n8 13\n8 14\n8 15\n",
    "1 2 1\n1 3 1\n3 2 1\n",
    "1\n2\n3\n4\n",
    "1 2\n2 3\n3 4\n4 5\n",
    "1 2\n2 3\n3 4\n3 5\n3 6\n",
    "1 2\n3 4\n1 2\n1 2\n2 3\n3 4\n1 4\n1 5\n",
    "1\n1:First node\n",
    "1 2\n2 3\n1 3\n3 4\n4 5\n4 6\n4 7\n",
    "1 2\n1 3\n1 4\n1 5\n",
    "1 2\n1 3\n2 4\n3 5\n4 6\n5 7\n",
  ];

  for (let i = 0; i < n; i++) {
    let lines = randomNumberGenerator(minDemoLines, maxDemoLines);
    let s = "";
    let mp = new Map();
    const maxRedo = 20;

    for (let [j, redo] = [0, 0]; j < lines && redo < maxRedo; ) {
      // 1...maxNodes
      let nodeA = randomNumberGenerator(1, 20);
      let nodeB = randomNumberGenerator(1, 20);
      //  A < B
      if (nodeA > nodeB) [nodeA, nodeB] = [nodeB, nodeA];

      if (nodeA === nodeB || (mp.get(nodeA) && mp.get(nodeA).has(nodeB))) {
        redo++;
        continue;
      }

      // const hasWeight = randomNumberGenerator(0, 2);
      s += nodeA.toString() + " " + nodeB.toString() + "\n";
      if (!mp.get(nodeA)) mp.set(nodeA, new Set());
      mp.get(nodeA).add(nodeB);
      // +
      // (!hasWeight ? " " + randomNumberGenerator(1, 99999).toString() : "") +
      // "\n";
      // const isDirected = randomNumberGenerator(0, 1);
      // if (j !== lines - 1) s += "\n"
      // else s += null
      j++;
    }
    demos.push(s);
  }
  // console.log(demos);
  return demos;
};
export const isValidNumber = (charArray, start, charArrayN, lenLimit) => {
  // if its, return integer value of that name, else, return false;
  if (charArrayN - start === 0 || charArrayN - start > lenLimit) return false;

  let n = parseInt(charArray.slice(start, charArrayN).join(""));
  return isNaN(n) ||
    n < 0 ||
    (!n && lenLimit === maxNodeLen) ||
    (!n && charArrayN - start > 1) ||
    (lenLimit === maxNodeLen && n > 50)
    ? false
    : n;
};
export const stringIinJex = (arr, i, j) => {
  return arr.slice(i, j).join("");
};
export const handleLines = (c) => {
  let lines = Array(2 * c - 1);
  let j = 1;
  for (let i = 0; i < lines.length - 1; i += 2) {
    lines[i] = j.toString();
    lines[i + 1] = "\n";
    j++;
  }

  lines[lines.length - 1] = c.toString();
  return lines.join("");
};
export const setTitle = (s) => {
  document.title = s;
};
export const Demos = makeDemos(50);
