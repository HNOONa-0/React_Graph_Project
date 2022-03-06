// changes
// exported as default
// made changes to setV2d
import Graph from "../graphLogic/Graph";
import TreeNode from "../graphLogic/TreeNode";
import Weight from "../graphLogic/Weight";
import KeyMaster from "../keyLogic/KeyMaster";

// import { maxNodes } from "../limits";
import { maxNodes } from "../myData/limits";
// import { setV2d } from "../utilityFuncs";
import setV2d from "../myUtils/setV2d";

class GraphInfo {
  constructor() {
    this.graph = new Graph();
    this.keyMaster = new KeyMaster();
    this.weight = new Weight();
    this.treeRoots = null;
    this.treeRootsData = null;
  }
  getNumOfNodes = () => {
    return this.keyMaster.getNumOfNodes();
  };
  getAdjacencyList = () => {
    return this.graph.getAdjacencyList();
  };
  getTreeRoots = () => {
    if (!this.treeRoots)
      this.treeRoots = TreeNode.completeBuildTree(
        this.getNumOfNodes(),
        this.getAdjacencyList()
      );
    return this.treeRoots;
  };
  getTreeRootsData = () => {
    const treeRoots = this.getTreeRoots();
    if (!this.treeRootsData)
      this.treeRootsData = TreeNode.validateData(
        TreeNode.completeTreeNodeData(treeRoots)
      );
    return this.treeRootsData;
  };
  completeTreeRootsDFS = (roots = this.getTreeRoots()) => {
    if (!roots.length) return [];

    // let visited = setV2d(maxNodes + 10, 0, 4);
    // let visited = setV2d(maxNodes + 10, 0, "false");
    let paths = [];
    // console.log(roots);
    for (const root of roots) {
      let path = [];
      // this.treeRootsDFS(rootpath);
      // this.treeRootDFS(root, path, visited);
      this.treeRootDFS(root, path);
      paths.push(path);
    }
    return paths;
  };
  // treeRootDFS = (root, path, visited) => {
  treeRootDFS = (root, path) => {
    // if (!root || !path || !visited) throw "treeRootDfs needs arguments";
    if (!root || !path) throw "treeRootDfs needs arguments";
    // if (visited[root.idx]) throw "treeRootDfs visited a node before";

    const idx = root.idx;
    // visited[idx] = true;
    path.push(idx);

    for (const next of root.children) {
      // this.treeRootDFS(next, path, visited);
      this.treeRootDFS(next, path);
      path.push(next.idx);
    }
  };
  completeTreeRootsBFS = (treeRootsData = this.getTreeRootsData()) => {
    if (!treeRootsData.length) return [];

    // let visited = setV2d(maxNodes + 10, 0, 4);
    // let visited = setV2d(maxNodes + 10, 0, "false");
    let paths = [];
    for (const data of treeRootsData) {
      const { mp, X, Y } = data;
      paths.push(this.treeRootBFS(mp, Y));
    }
    return paths;
  };
  treeRootBFS = (mp, Y) => {
    // easy, we have y level of roots & Y of every tree
    // if (!root || !visited) throw "treeRootBFS needs arguments";
    // setV2d(Y + 1, 0);
    let nodesAtLevelI = setV2d(Y + 1, 0, "array");
    for (const [key, val] of mp) {
      nodesAtLevelI[val.y].push(key);
    }
    return nodesAtLevelI;
  };
  completeDFS = () => {
    return this.graph.completeDFS(this.getNumOfNodes());
  };
  completeBFS = () => {
    return this.graph.completeBFS(this.getNumOfNodes());
  };
  getBFSPath = () => {
    const nodesAtLevelI = this.graph.BFS();
    // console.log(nodesAtLevelI);

    return nodesAtLevelI;
  };
  isCyclic = () => {
    return this.graph.isCyclic();
  };
  getDFSPath = () => {
    let path = [];
    this.graph.DFS(path);
    // console.log(path);

    return path;
  };
}
export default GraphInfo;
