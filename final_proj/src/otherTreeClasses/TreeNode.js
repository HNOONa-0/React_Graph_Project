// this one doesnt work
const rootSize = 1;
const siblingDistance = 0;
const treeDistance = 0;
const findIndex = (e, arr) => {
  for (let i = 0; i < arr.length; i++) if (e === arr[i]) return i;
  return -1;
};
const isLeaf = (root) => {
  return root.children.length === 0;
};
const isLeftMost = (root) => {
  if (!root.parent) return true;
  return root.parent.children[0] === root;
};
const isRightMost = (root) => {
  // root root is a right most child
  if (!root.parent) return true;
  return root.parent.children[root.parent.children.length - 1] === root;
};
const getPreviousSibling = (root) => {
  // returns 0 when no left sibling exists
  if (!root.parent || isLeftMost(root)) return 0;
  return root.parent.children[findIndex(root, root.parent.children) - 1];
};
const getNextSibling = (root) => {
  // returns 0 when no right sibling exists
  if (!root.parent || isRightMost(root)) return 0;
  return root.parent.children[findIndex(root, root.parent.children) + 1];
};
const getLeftMostSibling = (root) => {
  if (!root.parent) return 0;
  if (isLeftMost(root)) return root;
  return root.parent.children[0];
};
const getLeftMostChild = (root) => {
  if (!root.children.length) return 0;
  return root.children[0];
};
const getRightMostChild = (root) => {
  if (!root.children.length) return 0;
  return root.children[root.children.length - 1];
};

export class TreeNode {
  // parent = 0 => root;
  // leftSibling = 0 => no left sibling
  constructor(parent, idx, depth, adjacencyList) {
    this.parent = parent;
    this.idx = idx;
    this.children = [...adjacencyList[idx]].map(
      (e) => new TreeNode(this, e, depth + 1, adjacencyList)
    );
    this.leftSibling = 0;
    this.rightSibling = 0;
    this.x = 0;
    this.y = depth;
    this.mod = 0;
    this.width = -1;
    this.height = -1;
  }
  // static printInfo = (root)=>{
  //     console.log(root);
  //     for (let i = 0; i < root.children.length; i++) this.printInfo(root.children[i]);
  // }
  static preorder = (root, mp) => {
    console.log(root);
    mp.set(root.idx, root);
    for (let i = 0; i < root.children.length; i++)
      this.preorder(root.children[i], mp);
  };
  static mapNodeToIdx = (root) => {
    let mp = new Map();
    this.preorder(root, mp);
    return mp;
  };
  static buildTree = (adjacencyList) => {
    // this.printInfo(root);

    // this constructs the tree & memorize its root
    let root = new TreeNode(0, 1, 0, adjacencyList);

    // assign initial x and mod values for roots
    this.calculateInitialX(root);

    // ensure no root is being drawn off screen
    this.checkAllChildrenOnScreen(root);

    // assign final x values to roots
    this.calculateFinalPositions(root, 0);

    return this.mapNodeToIdx(root);
  };
  // static intializeParameters = (root) =>{
  //     // compute left sibling for each root & x value
  //     let n = root.children.length;
  //     for (let i = 0; i < n; i++){
  //         root.children[i].leftSibling = !i ? 0 : root.children[i - 1];
  //         root.children[i].rightSibling = i === n - 1 ? 0 : root.children[i + 1];
  //         this.intializeParameters(root.children[i]);
  //     }
  // }
  static calculateFinalPositions(root, modSum) {
    root.x += modSum;
    modSum += root.mod;

    for (let i = 0; i < root.children.length; i++)
      this.calculateFinalPositions(root.children[i], modSum);

    if (!root.children.length) {
      root.width = root.x;
      root.height = root.y;
    } else {
      let maxW = 0;
      let maxH = 0;
      for (let i = 0; i < root.children.length; i++) {
        maxW = Math.max(maxW, root.children[i].width);
        maxH = Math.max(maxH, root.children[i].height);
      }
      root.width = maxW;
      root.height = maxH;
    }
  }
  static calculateInitialX(root) {
    for (let i = 0; i < root.children.length; i++) {
      this.calculateInitialX(root.children[i]);
    }

    // if no children
    if (isLeaf(root)) {
      // if there is a previous sibling in this set, set x to prevous sibling + designated distance
      if (!isLeftMost(root))
        root.x = getPreviousSibling(root).x + rootSize + siblingDistance;
      else root.x = 0;
    }
    // if there is only one child
    else if (root.children.length === 1) {
      // if this is the first root in a set, set it's x value equal to it's child's x value
      if (isLeftMost(root)) root.x = root.children[0].x;
      else {
        root.x = getPreviousSibling(root).x + rootSize + siblingDistance;
        root.mod = root.x - root.children[0].x;
      }
    } else {
      let leftChild = getLeftMostChild(root);
      let rightChild = getRightMostChild(root);
      let mid = (leftChild.x + rightChild.x) / 2;

      if (isLeftMost(root)) root.x = mid;
      else {
        root.x = getPreviousSibling(root).x + rootSize + siblingDistance;
        root.mod = root.x - mid;
      }
    }

    if (root.children.length > 0 && !isLeftMost(root)) {
      // Since subtrees can overlap, check for conflicts and shift tree right if needed
      this.checkForConflicts(root);
    }
  }
  static checkForConflicts(root) {
    let minDistance = treeDistance + rootSize;
    let shiftValue = 0;

    // let rootContour = new Map();
    let rootContour = new Map();
    this.getLeftContour(root, 0, rootContour);

    let sibling = getLeftMostSibling(root);
    while (sibling && sibling !== root) {
      let siblingContour = new Map();
      this.getRightContour(sibling, 0, siblingContour);

      for (
        let level = root.y + 1;
        level <=
        Math.min(
          Math.max(...rootContour.keys()),
          Math.max(...siblingContour.keys())
        );
        level++
      ) {
        let distance = rootContour[level] - siblingContour[level];
        if (distance + shiftValue < minDistance) {
          shiftValue = minDistance - distance;
        }
      }

      if (shiftValue > 0) {
        root.x += shiftValue;
        root.mod += shiftValue;

        this.centerNodesBetween(root, sibling);

        shiftValue = 0;
      }

      sibling = getNextSibling(sibling);
    }
  }
  static centerNodesBetween(leftRoot, rightRoot) {
    console.log(leftRoot);
    let leftIndex = findIndex(leftRoot.parent.children, rightRoot);
    let rightIndex = findIndex(leftRoot.parent.children, leftRoot);

    let numNodesBetween = rightIndex - leftIndex - 1;

    if (numNodesBetween > 0) {
      let distanceBetweenNodes =
        (leftRoot.x - rightRoot.x) / (numNodesBetween + 1);

      let count = 1;
      for (let i = leftIndex + 1; i < rightIndex; i++) {
        let middleNode = leftRoot.parent.children[i];

        let desiredx = rightRoot.x + distanceBetweenNodes * count;
        let offset = desiredx - middleNode.x;

        middleNode.x += offset;
        middleNode.mod += offset;

        count++;
      }

      this.checkForConflicts(leftRoot);
    }
  }
  static checkAllChildrenOnScreen(root) {
    let rootContour = new Map();
    this.getLeftContour(root, 0, rootContour);

    let shiftAmount = 0;
    for (const [key, value] of rootContour) {
      if (value + shiftAmount < 0) shiftAmount = value * -1;
    }

    if (shiftAmount > 0) {
      root.x += shiftAmount;
      root.mod += shiftAmount;
    }
  }
  static getLeftContour(root, modSum, values) {
    if (!values.has(root.y)) values.set(root.y, root.x + modSum);
    else values[root.y] = Math.min(values[root.y], root.x + modSum);

    modSum += root.mod;
    for (let i = 0; i < root.children.length; i++)
      this.getLeftContour(root.children[i], modSum, values);
  }
  static getRightContour(root, modSum, values) {
    if (!values.has(root.y)) values.set(root.y, root.x + modSum);
    else values[root.y] = Math.max(values[root.y], root.x + modSum);

    modSum += root.mod;
    for (let i = 0; i < root.children.length; i++)
      this.getRightContour(root.children[i], modSum, values);
  }
}
