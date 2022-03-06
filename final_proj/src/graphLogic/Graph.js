// changes
// exported as default
// made changes to setV2d
// import { Fill, maxNodes } from "../limits";
import { Fill, maxNodes } from "../myData/limits";
// import { setV2d } from "../utilityFuncs";
import setV2d from "../myUtils/setV2d";

class Graph {
  constructor() {
    // edgeStack is for chaching purposes
    // can we make adjacency list dynamic? yes!, using a set (hashmap, we can delete/insert in O(1))

    // this.graphMap = setV2d(maxNodes + 10, maxNodes + 10);
    this.graphMap = setV2d(maxNodes + 10, maxNodes + 10, "array", "0");
    // this.edgeStack = setV2d(maxNodes + 10, maxNodes + 10, 1, 2);
    this.edgeStack = setV2d(maxNodes + 10, maxNodes + 10, "array", "array");
    // this.adjacencyList = setV2d(maxNodes + 10, 0, 2);
    this.adjacencyList = setV2d(maxNodes + 10, 0, "set");
    // console.log(this.adjacencyList);
  }
  getAdjacencyList = () => {
    return this.adjacencyList;
  };
  getEdgeStack = () => {
    return this.edgeStack;
  };
  getGraphMap = () => {
    return this.graphMap;
  };
  addEdge = (a, b, isDirected) => {
    // m < M
    const m = Math.min(a, b);
    const M = Math.max(a, b);
    const isForward = a === m && b === M;
    // add to our adjacency list
    this.graphMap[a][b] = 1;
    this.adjacencyList[a].add(b);

    if (!isDirected) {
      this.graphMap[b][a] = 1;
      this.adjacencyList[b].add(a);
    }

    this.edgeStack[m][M].push({ isDirected, isForward });
  };
  undoEdge = (a, b) => {
    // a < b
    if (this.edgeStack[a][b].empty()) return;

    this.edgeStack[a][b].pop();
    if (this.edgeStack[a][b].empty()) {
      this.graphMap[a][b] = 0;
      this.adjacencyList[a].delete(b);

      this.graphMap[b][a] = 0;
      this.adjacencyList[b].delete(a);
      return;
    }
    const { isDirected, isForward } = this.edgeStack[a][b].top();

    if (!isDirected) {
      this.graphMap[a][b] = 1;
      this.adjacencyList[a].add(b);
      this.graphMap[b][a] = 1;
      this.adjacencyList[b].add(a);
    } else if (isForward) {
      this.graphMap[a][b] = 1;
      this.adjacencyList[a].add(b);
      this.graphMap[b][a] = 0;
      this.adjacencyList[b].delete(a);
    } else {
      this.graphMap[a][b] = 0;
      this.adjacencyList[a].delete(b);
      this.graphMap[b][a] = 1;
      this.adjacencyList[b].add(a);
    }
  };
  completeBFS = (n) => {
    if (!n) return [];

    let paths = [];
    // let visited = setV2d(maxNodes + 10, 0, 4);
    let visited = setV2d(maxNodes + 10, 0, "false");

    for (let i = 1; i < n; i++) {
      if (visited[i]) continue;
      paths.push(this.BFS(i, visited));
    }
    return paths;
  };
  completeDFS = (n) => {
    if (!n) return [];
    let paths = [];
    // let visited = setV2d(maxNodes + 10, 0, 4);
    let visited = setV2d(maxNodes + 10, 0, "false");

    for (let i = 1; i < n; i++) {
      if (visited[i]) continue;

      let path = [];
      this.DFS(path, visited, 0, i);
      paths.push(path);
    }
    return paths;
  };
  DFS = (
    path = undefined,
    // visited = setV2d(maxNodes + 10, 0, 4)
    visited = setV2d(maxNodes + 10, 0, "false"),
    from = 0,
    cur = 1
  ) => {
    if (visited[cur]) return;

    visited[cur] = true;
    if (path) path.push(cur);

    for (const next of this.adjacencyList[cur]) {
      if (next === from) continue;

      this.DFS(path, visited, cur, next);

      if (path) path.push(next);
    }
  };
  BFS = (
    cur = 1,
    // visited = setV2d(maxNodes + 10, 0, 4),
    visited = setV2d(maxNodes + 10, 0, "false")
  ) => {
    // let nodesAtIthLevel = setV2d(maxNodes + 10, 0, 1);
    // nodesAtIthLevel[0].push(cur);

    let nodesAtIthLevel = [[cur]];
    visited[cur] = true;

    for (let i = 0; i < nodesAtIthLevel.length; i++) {
      for (let j = 0; j < nodesAtIthLevel[i].length; j++) {
        for (const next of this.adjacencyList[nodesAtIthLevel[i][j]]) {
          if (visited[next]) continue;
          visited[next] = true;

          if (nodesAtIthLevel.length <= i + 1)
            nodesAtIthLevel.push(new Array());
          nodesAtIthLevel[i + 1].push(next);
        }
      }
    }
    return nodesAtIthLevel;
  };
  isCyclic = (
    // visited = setV2d(maxNodes + 10, 0, 4),
    visited = setV2d(maxNodes + 10, 0, "false"),
    from = 0,
    cur = 1
  ) => {
    // cur is curIndex, from is just the last place we came from, intially is 0
    // i think works, for asingle component ofcourse
    if (visited[cur]) return true;

    // mark as visited
    visited[cur] = 1;

    // for all verticies connected cur current vertix
    let r = false;
    for (const next of this.adjacencyList[cur]) {
      if (next === from) continue;

      r = this.isCyclic(visited, cur, next);
      if (r) break;

      visited[next] = 0;
    }
    return r;
  };
  isSingleParent = (n = 0) => {
    // does each node has exactly one parent
    let mp = new Map();
    for (let i = 1; i < n; i++) mp.set(i, 0);

    const maxEdges = 1;

    for (let i = 1; i < n; i++) {
      // map to indicate how many parents for this node exists
      for (const w of this.adjacencyList[i]) {
        let score = mp.get(w);
        if (score + 1 > maxEdges) {
          // console.log(w);
          return false;
        }
        mp.set(w, score + 1);
      }
    }
    return true;
  };
  isSingleComponent = (n = 0) => {
    // does the graph consists only of a single component
    // start at root node, if we start at root node & don't visit all the nodes, then, its not a single component
    // we can use a visited array of N nodes, if one of the nodes after we DFS/dfs starting from the root is unvisited
    // we dont have a single component

    // let visited = setV2d(maxNodes + 10, 0, 4);
    let visited = setV2d(maxNodes + 10, 0, "false");
    this.DFS(undefined, visited);

    for (let i = 1; i < n; i++) if (!visited[i]) return false;
    return true;
  };
}
export default Graph;
