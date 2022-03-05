import { Graph } from "../graphLogic/Graph";
import { TreeNode1 } from "../graphLogic/TreeNode1";
import { Weight } from "../graphLogic/Weight";
import { KeyMaster } from "../keyLogic/KeyMaster";
import { maxNodes } from "../limits";
import { setV2d } from "../utilityFuncs";

export class GraphInfo {
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
      this.treeRoots = TreeNode1.completeBuildTree(
        this.getNumOfNodes(),
        this.getAdjacencyList()
      );
    return this.treeRoots;
  };
  getTreeRootsData = () => {
    const treeRoots = this.getTreeRoots();
    if (!this.treeRootsData)
      this.treeRootsData = TreeNode1.validateData(
        TreeNode1.completeTreeNodeData(treeRoots)
      );
    return this.treeRootsData;
  };
  completeTreeRootsDFS = (roots = this.getTreeRoots()) => {
    if (!roots.length) return [];

    let visited = setV2d(maxNodes + 10, 0, 4);
    let paths = [];
    // console.log(roots);
    for (const root of roots) {
      let path = [];
      // this.treeRootsDFS(rootpath);
      this.treeRootDFS(root, path, visited);
      paths.push(path);
    }
    return paths;
  };
  treeRootDFS = (root, path, visited) => {
    if (!root || !path || !visited) throw "treeRootDfs needs arguments";
    if (visited[root.idx]) throw "treeRootDfs visited a node before";

    const idx = root.idx;
    visited[idx] = true;
    path.push(idx);

    for (const next of root.children) {
      this.treeRootDFS(next, path, visited);
      path.push(next.idx);
    }
  };
  completeTreeRootsBFS = (treeRootsData = this.getTreeRootsData()) => {
    if (!treeRootsData.length) return [];

    // let visited = setV2d(maxNodes + 10, 0, 4);
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

    let nodesAtLevelI = setV2d(Y + 1, 0);
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
  // tree any graph, this is useless function
  // canITree = (isDirectedMain) => {
  //   const n = this.getNumOfNodes();
  //   // let a = !isDirectedMain ? true : this.graph.isSingleParent(n);
  //   let b = this.graph.isSingleComponent(n);
  //   // let c = !this.graph.isCyclic();
  //   // console.log({ b, c });
  //   // console.log({a,b,c})
  //   // return a && b && c;
  //   // return a && b;
  //   // return b && c;
  //   return b;
  // };
  // asTree = () => {
  //   const adjacencyList = this.getAdjacencyList();
  //   const n = this.getNumOfNodes();
  //   let roots = [];
  //   let visited = setV2d(maxNodes + 10, 0, 4);

  //   for (let i = 1; i < n; i++) {
  //     if (visited[i]) continue;
  //     const newRoot = TreeNode1.buildTree(adjacencyList, i, visited);
  //     const data = TreeNode1.TreeNodeData(adjacencyList, newRoot);
  //     roots.push(data);

  //     let minX = 0;
  //     for (const [key, val] of data.mp) minX = Math.min(minX, val.x);
  //     if (minX < 0) {
  //       for (const [key, val] of data.mp) val.x += -minX;
  //       data.X += -minX;
  //     }
  //     // console.log(minX);
  //     // console.log(roots[roots.length - 1]);
  //     // if !X, X = 1
  //     // if (!roots[roots.length - 1].X) roots[roots.length - 1].X = 1;
  //   }
  //   return roots;
  // };
}
