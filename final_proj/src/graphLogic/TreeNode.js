// full credit: https://llimllib.github.io/pymag-trees/
// more links for helping understand:
// https://rachel53461.wordpress.com/2014/04/20/algorithm-for-drawing-trees/
// https://stackoverflow.com/questions/8289518/algorithm-for-efficiently-drawing-trees
// https://stackoverflow.com/questions/13128750/what-are-the-step-to-the-reingold-tilford-algorithm-and-how-might-i-program-it

// exported as default
// made changes to setV2d
// changed name to TreeNode from TreeNode1

// import { maxNodes } from "../limits";
import { maxNodes } from "../myData/limits";

// import { setV2d } from "../utilityFuncs";
import setV2d from "../myUtils/setV2d";

const makechildren = (
  curParent,
  curDepth,
  curIndex,
  adjacencyList,
  visited
) => {
  let children = [];
  let i = 0;
  for (const next of adjacencyList[curIndex]) {
    if (visited[next]) continue;
    i++;
    children.push(
      new TreeNode(curParent, curDepth + 1, i, next, adjacencyList, visited)
    );
  }
  return children;
};
class TreeNode {
  constructor(
    parent,
    depth,
    number,
    idx,
    adjacencyList,
    // visited = setV2d(maxNodes + 10, 0, 4)
    visited = setV2d(maxNodes + 10, 0, "false")
  ) {
    visited[idx] = true;

    this.x = -1;
    this.y = depth;
    this.children = makechildren(this, depth, idx, adjacencyList, visited);

    this.parent = parent;
    this.thread = 0;
    this.offset = 0;
    this.ancestor = this;
    this.change = 0;
    this.shift = 0;
    this.mod = 0;
    this._lmost_sibling = 0;

    // the number of the node in its group of siblings 1..n
    this.number = number;
    this.idx = idx;
  }
  left_brother = () => {
    let n = 0;
    if (this.parent) {
      for (const node of this.parent.children) {
        if (node === this) return n;
        else n = node;
      }
    }
    return n;
  };
  get_lmost_sibling = () => {
    // console.log(this);
    if (
      !this._lmost_sibling &&
      this.parent &&
      this !== this.parent.children[0]
    ) {
      this._lmost_sibling = this.parent.children[0];
    }
    // console.log("inside getlmost" + this._lmost_sibling);
    return this._lmost_sibling;
  };
  static buildTree(
    adjacencyList,
    idx = 1,
    // visited = setV2d(maxNodes + 10, 0, 4)
    visited = setV2d(maxNodes + 10, 0, "false")
  ) {
    // build tree
    if (!adjacencyList) return null;

    let root = new TreeNode(0, 0, 1, idx, adjacencyList, visited);
    this.first_walk(root);
    this.second_walk(root);

    // this.printInfo(root);
    return root;
  }
  static first_walk(v, distance = 1) {
    if (v.is_leaf()) {
      if (v.get_lmost_sibling()) {
        // console.log("leaf & with left sibling");
        v.x = v.left_brother().x + distance;
      } else v.x = 0;
    } else {
      let default_ancestor = v.children[0];
      for (const w of v.children) {
        this.first_walk(w, distance);
        default_ancestor = this.apportion(w, default_ancestor, distance);
      }
      this.execute_shifts(v);

      let midpoint =
        (v.children[0].x + v.children[v.children.length - 1].x) / 2;
      // console.log(midpoint);
      // let ell = v.children[0];
      // let arr = v.children[v.children.length - 1];
      let w = v.left_brother();

      if (w) {
        v.x = w.x + distance;
        v.mod = v.x - midpoint;
      } else {
        v.x = midpoint;
      }
    }
    return v;
  }
  static apportion(v, default_ancestor, distance = 1) {
    let w = v.left_brother();

    if (w) {
      let vir = v;
      let vor = v;

      let vil = w;
      let vol = v.get_lmost_sibling();

      let sir = v.mod;
      let sor = v.mod;
      let sil = vil.mod;
      let sol = vol.mod;

      while (vil.right() && vir.left()) {
        vil = vil.right();
        vir = vir.left();
        vol = vol.left();
        vor = vor.right();
        vor.ancestor = v;

        let shift = vil.x + sil - (vir.x + sir) + distance;

        if (shift > 0) {
          let a = this.ancestor(vil, v, default_ancestor);
          this.move_subtree(a, v, shift);
          sir = sir + shift;
          sor = sor + shift;
        }
        sil += vil.mod;
        sir += vir.mod;
        sol += vol.mod;
        sor += vor.mod;
      }
      if (vil.right() && !vor.right()) {
        // console.log(vor.mod);
        vor.thread = vil.right();
        vor.mod += sil - sor;
        // console.log(vor.mod);
      } else {
        if (vir.left() && !vol.left()) {
          // console.log(vol.mod);
          vol.thread = vir.left();
          vol.mod += sir - sol;
          // console.log(vol.mod);
        }
        default_ancestor = v;
      }
    }
    return default_ancestor;
  }
  static move_subtree(wl, wr, shift) {
    let subtrees = wr.number - wl.number;

    wr.change -= shift / subtrees;
    wr.shift += shift;
    wl.change += shift / subtrees;
    wr.x += shift;
    wr.mod += shift;
  }
  static execute_shifts(v) {
    let shift = 0;
    let change = 0;

    for (let i = v.children.length - 1; i >= 0; i--) {
      let w = v.children[i];

      w.x += shift;
      w.mod += shift;
      change += w.change;
      shift += w.shift + change;
    }
  }
  static ancestor(vil, v, default_ancestor) {
    if (v.parent.children.includes(vil.ancestor)) {
      return vil.ancestor;
    }
    return default_ancestor;
  }
  static second_walk(v, m = 0, depth = 0) {
    v.x += m;
    v.y = depth;
    for (const w of v.children) this.second_walk(w, m + v.mod, depth + 1);
  }
  static validateData(rootsData) {
    for (const data of rootsData) {
      let minX = 0;
      for (const [key, val] of data.mp) minX = Math.min(minX, val.x);
      if (minX < 0) {
        for (const [key, val] of data.mp) val.x += -minX;
        data.X += -minX;
      }
    }
    return rootsData;
  }
  static treeNodeData(root) {
    if (!root) return null;

    let [X, Y, mp] = [0, 0, this.indexToNode(root)];
    for (const [key, value] of mp) {
      X = Math.max(X, value.x);
      Y = Math.max(Y, value.y);
    }
    return { mp, X, Y };
  }
  static completeTreeNodeData = (roots) => {
    if (!roots) return [];
    let rootsData = [];
    for (const root of roots) {
      rootsData.push(this.treeNodeData(root));
    }
    return rootsData;
  };
  static completeBuildTree = (n, adjacencyList) => {
    if (!n || !adjacencyList) return [];

    let roots = [];
    // let visited = setV2d(maxNodes + 10, 0, 4);
    let visited = setV2d(maxNodes + 10, 0, "false");
    for (let i = 1; i < n; i++) {
      if (visited[i]) continue;

      const newRoot = this.buildTree(adjacencyList, i, visited);
      roots.push(newRoot);
    }
    return roots;
  };
  static printInfo = (root) => {
    console.log({ idx: root.idx, root });
    // console.log({ idx: root.idx, x: root.x });

    for (let i = 0; i < root.children.length; i++)
      this.printInfo(root.children[i]);
  };
  static postOrderIndexToNode(root, mp) {
    // console.log(root);
    // only need x and y now
    mp.set(root.idx, root);
    for (let i = 0; i < root.children.length; i++) {
      this.postOrderIndexToNode(root.children[i], mp);
    }
  }
  static indexToNode(root) {
    let mp = new Map();
    this.postOrderIndexToNode(root, mp);
    return mp;
  }
  is_leaf = () => {
    return this.children.length === 0;
  };
  left = () => {
    if (this.thread) return this.thread;
    else if (this.children.length) return this.children[0];
    else return 0;
  };
  right = () => {
    if (this.thread) return this.thread;
    else if (this.children.length)
      return this.children[this.children.length - 1];
    else return 0;
  };
}
// constructor(parent, depth, number, idx, fromIdx, adjacencyList){
//     this.x = -1;
//     this.y = depth;
//     this.children = [...adjacencyList[idx]].filter(e => e !== fromIdx).map((e, i) => new TreeNode(this, depth + 1, i + 1, e, idx, adjacencyList));

//     this.parent = parent;
//     this.thread = 0;
//     this.offset = 0;
//     this.ancestor = this;
//     this.change = 0;
//     this.shift = 0;
//     this.mod = 0;
//     this._lmost_sibling = 0;

//     // the number of the node in its group of siblings 1..n
//     this.number = number
//     this.idx = idx;
// }
// let root = new TreeNode(0, 0, 1, 1, 0, adjacencyList);
export default TreeNode;
