import React, { useState } from "react";

import { Button1 } from "../button/Button1";
import { GraphInfo } from "../graphInfo/GraphInfo";
import { TreeNode1 } from "../graphLogic/TreeNode1";
import { Stage1 } from "../stage/Stage1";
import { TextBox1 } from "../textBoxBlueprint/textBox1";
import { makeDemos, randomNumberGenerator } from "../utilityFuncs";
import "./Div1Styles.css";
export const Div1 = () => {
  const [graphInfo, setGraphInfo] = useState(new GraphInfo());
  const [isDirectedMain, setIsDirectedMain] = useState(true);
  const [demos, setDemos] = useState(makeDemos(10));
  const [t3Value, setT3Value] = useState("");
  const [isAnime, setIsAnime] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  // const { graph, weight, keyMaster } = graphInfo;

  // console.log(isDirectedMain)

  // let textRef = React.createRef();
  // let buttonRef = React.createRef();
  let stageRef = React.createRef();
  const scatter = () => {
    stageRef.current.scatter();
  };
  const resetScale = () => {
    stageRef.current.resetScale();
  };
  const downloadURI = () => {
    stageRef.current.downloadURI();
  };
  const animateBFS = () => {
    stageRef.current.BFS();
  };
  const animateDFS = () => {
    stageRef.current.DFS();
  };
  const tree = () => {
    // console.log(graphInfo.graph.adjacencyList);
    // console.log(graphInfo.graph.isCyclic())
    if (!isDirectedMain || !graphInfo.canITree(isDirectedMain)) {
      alert(
        "constraints:\n1. no cycles\n2. a single component\n3. directed graph"
      );
      return;
    }

    let root = TreeNode1.buildTree(graphInfo.getAdjacencyList());
    let mp = TreeNode1.indexToNode(root);

    let X = 0;
    let Y = 0;

    for (const [key, value] of mp) {
      X = Math.max(X, value.x);
      Y = Math.max(Y, value.y);
    }
    // console.log(XAtIthLevel);
    stageRef.current.tree(mp, X, Y);
  };
  const loadRandomDemo = () => {
    // console.log("clicked for a demo");
    // setT3Value(demos[randomNumberGenerator(0, demos.length - 1)]);
    stageRef.current.BFS();
  };
  return (
    <div className="div-1">
      <TextBox1
        obj1={{
          isDirectedMain,
          t3Value,
          setGraphInfo,
          setIsUpdate,
          isAnime,
        }}
      ></TextBox1>
      <Button1
        funcs={{
          setIsDirectedMain,
          scatter,
          resetScale,
          tree,
          downloadURI,
          loadRandomDemo,
          animateDFS,
          animateBFS,
        }}
        isDirectedMain={isDirectedMain}
        isUpdate={isUpdate}
        isAnime={isAnime}
      ></Button1>
      <Stage1
        ref={stageRef}
        graphInfo={graphInfo}
        setIsAnime={setIsAnime}
      ></Stage1>
    </div>
  );
};
