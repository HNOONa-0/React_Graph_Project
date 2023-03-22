import React, { useEffect } from "react";
// import { maxNodes } from "./limits";
import { maxNodes } from "../myData/limits";
// import { setTitle } from "./utilityFuncs";
import { setTitle } from "../myUtils/generalDocumentFuncs";

const Guide = () => {
  let [i, j, k] = [0, 0, 0];
  useEffect(() => {
    setTitle("Guide");
  }, []);
  return (
    <div>Guide is empty</div>
  );
};
export default Guide;
