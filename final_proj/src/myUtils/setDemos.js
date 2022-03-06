import {
  maxDemoLines,
  maxDemoNodeNumber,
  maxDemos,
  minDemoLines,
  minDemoNodeNumber,
  minDemos,
} from "../myData/limits";
import { randomBetween } from "./myRandomFunctions";
// changes
// makeDemos is now set demos
// there is max and min demo node number
// use randomBetween instead of randomNumberGenerator
const setDemos = (n = randomBetween(minDemos, maxDemos + 1)) => {
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
    let lines = randomBetween(minDemoLines, maxDemoLines + 1);
    let s = "";
    let mp = new Map();
    const maxRedo = 20;

    for (let [j, redo] = [0, 0]; j < lines && redo < maxRedo; ) {
      // 1...maxNodes
      let nodeA = randomBetween(minDemoNodeNumber, maxDemoNodeNumber + 1);
      let nodeB = randomBetween(minDemoNodeNumber, maxDemoNodeNumber + 1);
      //  A < B
      if (nodeA > nodeB) [nodeA, nodeB] = [nodeB, nodeA];

      if (nodeA === nodeB || (mp.get(nodeA) && mp.get(nodeA).has(nodeB))) {
        redo++;
        continue;
      }

      // const hasWeight = randomBetween(0, 2);
      s += nodeA.toString() + " " + nodeB.toString() + "\n";
      if (!mp.get(nodeA)) mp.set(nodeA, new Set());
      mp.get(nodeA).add(nodeB);
      // +
      // (!hasWeight ? " " + randomBetween(1, 99999).toString() : "") +
      // "\n";
      // const isDirected = randomBetween(0, 1);
      // if (j !== lines - 1) s += "\n"
      // else s += null
      j++;
    }
    demos.push(s);
  }
  // console.log(demos);
  return demos;
};
export default setDemos;
