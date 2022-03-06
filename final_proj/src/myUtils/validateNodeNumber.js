// changes

import { maxNodeLen, maxNodes } from "../myData/limits";

// new, might replace the one in Parse
export const validateNodeNumber = (charArray, start, charArrayN, lenLimit) => {
  // if its, return integer value of that name, else, return false;
  if (charArrayN - start === 0 || charArrayN - start > lenLimit) return false;

  let n = parseInt(charArray.slice(start, charArrayN).join(""));
  return isNaN(n) ||
    n < 0 ||
    (!n && lenLimit === maxNodeLen) ||
    (!n && s.length > 1) ||
    (lenLimit === maxNodeLen && n > maxNodes)
    ? null
    : n;
};
