import GraphInfo from "../../graphInfo/GraphInfo";
// import { maxChars, maxLines, maxNodeLen, maxWeightLen } from "../../limits";
import {
  maxChars,
  maxLines,
  maxNodeLen,
  maxWeightLen,
} from "../../myData/limits";
// import { handleLines, setV2d, stringIinJex } from "../../utilityFuncs";
import { setLines } from "../../myUtils/setLines";
import { mySubstr } from "../../myUtils/charArrayFuncs";
import setV2d from "../../myUtils/setV2d";

let myTimer;
class Parse {
  constructor() {}
  static parseAllLines = (textBuffer, N, isDirectedMain) => {
    // console.log(lines);
    // let inBuffer = setV2d(maxChars + 10, 0, 4);
    let inBuffer = setV2d(maxChars + 10, 0, "0");
    let graphInfo = new GraphInfo();

    for (let i = 0; i < N; i++) {
      if (textBuffer[i][0] <= 2) continue;
      this.newEdge(textBuffer[i], inBuffer, graphInfo, isDirectedMain) ||
        this.newName(textBuffer[i], inBuffer, graphInfo);
    }
    return graphInfo;
  };
  static isValidNumber = (s, lenLimit) => {
    // if its, return integer value of that name, else, return false;
    if (!s.length || s.length > lenLimit) return null;

    let n = parseInt(s);

    // console.log(n);
    return isNaN(n) ||
      n < 0 ||
      (!n && lenLimit === maxNodeLen) ||
      (!n && s.length > 1) ||
      (lenLimit === maxNodeLen && n > 50)
      ? null
      : n;
  };
  static newEdge = (
    s,
    inBuffer,
    { graph, weight, keyMaster },
    isDirectedMain
  ) => {
    // k is length for res for & j is length for buffer
    let res = [1, null, null, null, null];

    let failCode = 0;
    const resMaxN = res.length;
    // decide to start at index 0 or 1
    const inBufferStart = 1;
    const resStart = 1;

    let k = inBufferStart;
    let j = resStart;

    // n is the length of the current line
    const n = s[0];
    // where does the ">" come first
    let isDirected = [0, 0, 0];
    let tempS = null;

    for (let i = 1; i < n; i++) {
      if (
        (s[i] === " " || s[i] === "\n" || s[i] === null) &&
        j > inBufferStart
      ) {
        // too many arguments
        if (k >= resMaxN) {
          // console.log("newEdge false" + "1");
          return false;
        }
        switch (k) {
          case 1:
            // n1>
            isDirected[0] = inBuffer[j - 1] === ">" ? 1 : 0;
            // tempS = stringIinJex(inBuffer, inBufferStart, j - isDirected[0]);
            tempS = mySubstr(inBuffer, inBufferStart, j - isDirected[0]);
            // console.log(this.isValidNumber(tempS, maxNodeLen));
            res[k] = this.isValidNumber(tempS, maxNodeLen);
            if (isDirected[0]) k++;
            break;
          case 2:
            // n1 > n2
            isDirected[1] =
              j - inBufferStart === 1 && inBuffer[inBufferStart] === ">"
                ? 1
                : 0;
            if (isDirected[1]) break;
            k++;
          case 3:
            // >n2
            isDirected[2] = inBuffer[inBufferStart] === ">" ? 1 : 0;
            if (isDirected[0] + isDirected[1] + isDirected[2] > 1) {
              // console.log("newEdge false" + "2");
              return false;
            }
            // tempS = stringIinJex(inBuffer, inBufferStart + isDirected[2], j);
            tempS = mySubstr(inBuffer, inBufferStart + isDirected[2], j);
            res[k] = this.isValidNumber(tempS, maxNodeLen);
            res[2] =
              isDirected[0] || isDirected[1] || isDirected[2] || isDirectedMain
                ? true
                : false;
            break;
          case 4:
            // weight
            // tempS = stringIinJex(inBuffer, inBufferStart, j);
            tempS = mySubstr(inBuffer, inBufferStart, j);
            res[k] = this.isValidNumber(tempS, maxWeightLen);
            break;
          default:
            break;
        }
        k++;
        j = inBufferStart;
        continue;
      } else if (s[i] !== " ") {
        if (s[i] === ":") {
          // console.log("newEdge false" + "3");
          return false;
        }
        inBuffer[j++] = s[i];
      }
      if (j - inBufferStart > maxWeightLen) {
        // console.log("newEdge false" + "4");
        return false;
      }
    }
    // check if any of the entries are null
    // console.log(k);
    // console.log(res);
    for (let i = 1; i < k; i++) {
      if (res[i] === null) {
        // console.log("newEdge false" + "5");
        return false;
      }
    }

    // if the two nodes are the same or n1> || n1 > only
    if (k === 3 || res[1] === res[3]) {
      // console.log("newEdge false" + "6");
      return false;
    }
    // short circuit if only a single node on the line
    if (k === 2 && keyMaster.getIndexOfKey(res[1])) return true;

    // l and k are interchangeable
    let [l, n1, isDirectedFinal, n2, w] = res;

    let isN1 = keyMaster.getIndexOfKey(n1) ? true : false;
    let isN2 = keyMaster.getIndexOfKey(n2) ? true : false;

    // we are out of keys for new nodes, so, we cant compile this line
    if ((!isN1 ? 1 : 0) + (!isN2 ? 1 : 0) > keyMaster.keysLeft()) {
      // console.log("newEdge false" + "7");
      return false;
    }

    for (let i = 1; i < k; i++) {
      // how can i know if a node exists & has no edges ? if it has a key, then its present, hence, we dont need
      // to map a node to itself inorder to know if its there
      switch (i) {
        case 1:
          keyMaster.giveIndex(n1);
          break;
        case 3:
          keyMaster.giveIndex(n2);

          graph.addEdge(
            keyMaster.getIndexOfKey(n1),
            keyMaster.getIndexOfKey(n2),
            isDirectedFinal
          );
          break;
        case 4:
          weight.addWeight(
            keyMaster.getIndexOfKey(n1),
            keyMaster.getIndexOfKey(n2),
            w
          );
          break;
        default:
          break;
      }
    }
    // console.log(res);
    return true;
  };
  static newName(s, inBuffer, { graph, weight, keyMaster }) {
    let colon = -1;
    const inBufferStart = 1;

    let j = inBufferStart;
    let n = s[0];

    let key = null;
    let tempS = null;

    for (let i = 1; i < n; i++) {
      if (s[i] === ":") {
        if (j === inBufferStart) {
          // console.log("newName false 1");
          return false;
        }
        // tempS = stringIinJex(inBuffer, inBufferStart, j);
        tempS = mySubstr(inBuffer, inBufferStart, j);
        key = this.isValidNumber(tempS, maxNodeLen);
        // console.log(inBuffer)
        // console.log(key)
        if (!key || !keyMaster.getIndexOfKey(key)) {
          // console.log("newName false 2");
          return false;
        }
        colon = i;
        break;
      } else if (s[i] !== " ") {
        if (j > inBufferStart && s[i - 1] === " ") {
          // console.log("newName false 3");
          return false;
        }
        inBuffer[j++] = s[i];
      }
      if (j - inBufferStart > maxNodeLen) {
        // console.log("newName false 4");
        return false;
      }
    }
    if (colon < 0) {
      // console.log("newName false 5");
      return false;
    }
    // trim to remove whitespace
    keyMaster.addLabel(
      key,
      keyMaster.getIndexOfKey(key),
      s
        .slice(colon + 1, n - 1)
        .join("")
        .trim()
    );

    return true;
  }
  static async forceCompile(
    textBuffer,
    setT1Value,
    setT2Value,
    setRowsN,
    s,
    setGraphInfo,
    isDirectedMain,
    isDemo = false,
    isDelay = true
  ) {
    let cols = 1;
    let rows = 0;

    for (let i = 0; rows < maxLines - 1 && i < s.length; i++) {
      if (cols >= maxChars && !(cols === maxChars && s[i] === "\n")) {
        // console.log(cols);
        continue;
      }
      textBuffer[rows][cols++] = s[i];
      if (s[i] === "\n") {
        textBuffer[rows][0] = cols;
        cols = 1;
        rows++;
      }
    }

    textBuffer[rows][cols++] = null;
    textBuffer[rows][0] = cols;

    // console.log(textBuffer)
    if (!isDemo) {
      s = "";
      for (let i = 0; i <= rows; i++)
        s += textBuffer[i].slice(1, textBuffer[i][0]).join("");
    }

    setT1Value(setLines(rows + 1));
    setT2Value(s);
    setRowsN(rows + 1);

    if (isDelay) {
      clearTimeout(myTimer);
      myTimer = setTimeout(() => {
        setGraphInfo(this.parseAllLines(textBuffer, rows + 1, isDirectedMain));
      }, 350);
    } else {
      setGraphInfo(this.parseAllLines(textBuffer, rows + 1, isDirectedMain));
    }
  }
}
export default Parse;
