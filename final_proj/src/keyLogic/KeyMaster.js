// exported as default
// made changes to setV2d

// import { maxNodes } from "../limits";
import { maxNodes } from "../myData/limits";
// import { setV2d } from "../utilityFuncs";
import setV2d from "../myUtils/setV2d";

class KeyMaster {
  constructor() {
    // this.keyToIndex = setV2d(maxNodes + 10, 0, 4);
    this.keyToIndex = setV2d(maxNodes + 10, 0, "0");
    // this.indexToKey = setV2d(maxNodes + 10, 0, 4);
    this.indexToKey = setV2d(maxNodes + 10, 0, "0");
    // this.indexToLabel = setV2d(maxNodes + 10, 0);
    this.indexToLabel = setV2d(maxNodes + 10, 0, "array");
    this.labelToIndex = new Map();

    this.cursor = 1;
    // console.log(this.keyToIndex);
    // console.log(this.indexToKey);
  }
  // deal only with the index, each time you get a key, go from key to index
  // if what you are looking for is not found, function will return 0
  getKeyToIndex = () => {
    return this.keyToIndex;
  };
  getIndexToKey = () => {
    return this.indexToKey;
  };
  getIndexToLabel = () => {
    return this.indexToLabel;
  };
  getLabelToIndex = () => {
    return this.labelToIndex;
  };
  getNumOfNodes = () => {
    return this.cursor;
  };

  getIndexOfKey = (key) => {
    return this.keyToIndex[key];
  };
  getKeyOfIndex = (index) => {
    return this.indexToKey[index];
  };
  getIndexOfLabel = (label) => {
    let r = this.labelToIndex.has(label) ? this.labelToIndex.get(label) : 0;
    return r;
  };
  getKeyOfLabel = (label) => {
    return this.indexToKey[this.getIndexOfLabel(label)];
  };
  getLabelOfIndex = (index) => {
    let s = this.indexToLabel[index];
    let lastLabel = s.length ? s[s.length - 1] : 0;
    return lastLabel;
  };
  getLabelOfKey = (key) => {
    return this.getLabelOfIndex(this.getIndexOfKey(key));
  };
  addLabel = (key, index, label) => {
    // console.log({key, index, label})
    const lastLabel = this.getLabelOfIndex(index);
    if (lastLabel !== 0) this.labelToIndex.delete(lastLabel);

    this.indexToLabel[index].push(label);
    this.labelToIndex.set(label, index);
  };
  undoLabel = (key, index) => {
    if (!this.indexToLabel[index].length) {
      return;
    }
    const lastLabel = this.indexToLabel[index].pop();
    this.labelToIndex.delete(lastLabel);

    const beforeLastLabel = this.getLabelOfIndex(index);
    if (beforeLastLabel) this.labelToIndex.set(lastLabel, index);
  };
  giveIndex = (key) => {
    if (this.getIndexOfKey(key)) return false;

    this.keyToIndex[key] = this.cursor;
    this.indexToKey[this.cursor] = key;
    this.cursor++;
    return true;
  };
  keysLeft = () => {
    // return keys left to determine if the curr line will compile or not
    return maxNodes - this.cursor + 1;
  };
  isFull = () => {
    return this.cursor > maxNodes;
  };
}
export default KeyMaster;
