// exported as default
// made changes to setV2d

// import { maxNodes } from "../limits";
import { maxNodes } from "../myData/limits";

// import { setV2d } from "../utilityFuncs";
import setV2d from "../myUtils/setV2d";
// a < b, bettter let  m < M
class Weight {
  constructor() {
    // this.weightMap = setV2d(maxNodes + 10, maxNodes + 10);
    this.weightMap = setV2d(maxNodes + 10, maxNodes + 10, "array", "0");
    // this.weightStack = setV2d(maxNodes + 10, maxNodes + 10, 1, 2);
    this.weightStack = setV2d(maxNodes + 10, maxNodes + 10, "array", "array");
  }
  getWeightMap = () => {
    return this.weightMap;
  };
  getWeightStack = () => {
    return this.weightStack;
  };
  addWeight = (a, b, w) => {
    // m < M
    const m = Math.min(a, b);
    const M = Math.max(a, b);

    this.weightMap[a][b] = w;
    this.weightMap[b][a] = w;

    this.weightStack[m][M].push(w);
  };
  undoWeight = (a, b) => {
    // m < M
    const m = Math.min(a, b);
    const M = Math.max(a, b);

    if (this.weightStack[m][M].length === 0) return;

    this.weightStack[a][b].pop();

    if (this.weightStack[a][b].length === 0) {
      this.weightMap[a][b] = 0;
      this.weightMap[b][a] = 0;
      return;
    }

    let w = this.weightStack[this.weightStack[a][b].length - 1];

    this.weightMap[a][b] = w;
    this.weightMap[b][a] = w;
  };
  redoWeight = (a, b) => {
    // does nothing
  };
}
export default Weight;
