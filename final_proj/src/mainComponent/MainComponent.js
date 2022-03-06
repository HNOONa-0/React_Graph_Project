// changes
// name changes
// Demos is constant now imported

import React, { useEffect, useState } from "react";
// import { ButtonDiv } from "../buttonDiv/ButtonDiv";
import ButtonDiv from "../buttonDiv/ButtonDiv";
// import { TextBox } from "../textBoxBlueprint/TextBox";
import Textbox from "../textbox/Textbox";
// import { GraphInfo } from "../graphInfo/GraphInfo";
import GraphInfo from "../graphInfo/GraphInfo";
// import { MyStage } from "../stage/MyStage";
import MyStage from "../stage/MyStage";
// import {
//   Demos,
//   randomNumberGenerator,
//   setTitle,
// } from "../utilityFuncs";
import Demos from "../myData/demoData";
import { randomBetween } from "../myUtils/myRandomFunctions";
import { setTitle } from "../myUtils/generalDocumentFuncs";

import "./MainComponentStyles.css";

export const MainComponent = (props) => {
  // console.log(props);
  // console.log(props.resizeObserver);
  // const mainComponentResizeObserver = props.mainComponentResizeObserver;

  const { savedText, updateSavedText } = props;
  // console.log(savedText);

  // const [demos, setDemos] = useState(Demos);
  const [demoIdx, setDemoIdx] = useState(
    // (0, demos.length)
    savedText ? -1 : randomBetween(0, Demos.length)
  );

  const [graphInfo, setGraphInfo] = useState(new GraphInfo());

  const [isDirectedMain, setIsDirectedMain] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isAnime, setIsAnime] = useState(false);

  const [stageDimension, setStageDimension] = useState({ width: 0, height: 0 });
  const [resizeObserver, setResizeObserver] = useState(
    new ResizeObserver((entries) => {
      const width = entries[0].target.offsetWidth;
      const height = entries[0].target.offsetHeight;
      setStageDimension({ width, height });
    })
  );

  let textRef = React.createRef(null);
  let stageRef = React.createRef(null);
  let buttonDivRef = React.createRef(null);

  const resetScale = () => {
    stageRef.current.resetScale();
  };
  const scatter = () => {
    stageRef.current.scatter();
  };
  const loadRandomDemo = () => {
    // console.log("clicked for a demo");
    let nextIndex = demoIdx;
    // demos.length
    while (nextIndex === demoIdx) nextIndex = randomBetween(0, Demos.length);
    setDemoIdx(nextIndex);
  };
  const animateDFS = () => {
    stageRef.current.DFS();
  };
  const animateBFS = () => {
    stageRef.current.BFS();
  };
  const tree = () => {
    stageRef.current.tree();
  };
  const downloadURI = () => {
    stageRef.current.downloadURI();
  };
  useEffect(() => {
    resizeObserver.observe(document.getElementById("mein-stage"));
    setTitle("Graph");
    // mainComponentResizeObserver.observe(
    //   document.getElementById("mein-component")
    // );
    return () => {
      console.log("main Component unmounted");
      resizeObserver.disconnect();
      // mainComponentResizeObserver.disconnect();
    };
  }, []);
  const { width, height } = stageDimension;
  return (
    <div className="main-component" id={"mein-component"}>
      <Textbox
        ref={textRef}
        funcs={{ setGraphInfo, setIsUpdate, updateSavedText }}
        bools={{ isDirectedMain, isUpdate, isAnime }}
        // demos[demoIdx]
        t3Val={demoIdx < 0 ? savedText : Demos[demoIdx]}
      />
      <ButtonDiv
        ref={buttonDivRef}
        bools={{ isDirectedMain, isUpdate, isAnime }}
        funcs={{
          resetScale,
          scatter,
          loadRandomDemo,
          animateDFS,
          animateBFS,
          tree,
          setIsDirectedMain,
          downloadURI,
        }}
      />
      <div className="stage-div" id={"mein-stage"}>
        {!width || !height ? null : (
          <MyStage
            ref={stageRef}
            // resizeObserver={resizeObserver}
            width={width}
            height={height}
            graphInfo={graphInfo}
            funcs={{ setIsUpdate, setIsAnime }}
            bools={{ isDirectedMain, isUpdate, isAnime }}
            // roots={graphInfo.asTree()}
          />
        )}
      </div>
    </div>
  );
};
