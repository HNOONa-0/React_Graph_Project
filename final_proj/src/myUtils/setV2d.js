// returns a 2 dimensional vector rows by cols & all entries are 0
// 0 is for bugs or someting
// val1 = 1 -> [], val1 = 2 -> set, val1 = 3 -> i, val1 = 4 -> 0
// val2 = 1 -> 0, val2 = 2 -> [], neiher -> object
// changes:
// rows = 0 & cols = 0 intially
// vals now get string literals as arguments instead of numbers to make it easier to read
// val = "0"-> 0, val = "1" -> index for number literals
// val = "string" -> String, val = "map" -> Map, and so on...

import objectFromStr from "./objectFromStr";

const setV2d = (rows = 0, cols = 0, val1, val2) => {
  let v2d = [];
  for (let i = 0; i < rows; i++) {
    let v = objectFromStr(val1, i);
    for (let j = 0; j < cols; j++) v.push(objectFromStr(val2, j));
    v2d.push(v);
  }
  return v2d;
};
export default setV2d;
