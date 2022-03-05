// idea is we want 2 text boxes communicating with one another
// the first will number the lines the second with contain actual text

import "./textBox1Styles.css";
import React, { useEffect, useState } from "react";
import { maxChars, maxLines } from "../limits";
import { handleLines, setV2d } from "../utilityFuncs";
import { Parse } from "./parse/Parse";

let textBuffer = setV2d(maxLines + 10, maxChars + 10);

export const TextBox1 = (props) => {
  //   console.log(props);
  const { setGraphInfo, isDirectedMain, t3Value, setIsUpdate, isAnime } =
    props.obj1;
  let t1 = React.createRef(null);
  let t2 = React.createRef(null);

  const [rowsN, setRowsN] = useState(1);
  const [t1Value, setT1Value] = useState(handleLines(rowsN));
  const [t2Value, setT2Value] = useState(t3Value);

  useEffect(() => {
    // it will run on first render or when isDirectedMain changes
    async function up() {
      setIsUpdate(true);
      await setGraphInfo(
        Parse.parseAllLines(textBuffer, rowsN, isDirectedMain)
      );
      setIsUpdate(false);
    }
    up();
  }, [isDirectedMain]);

  useEffect(() => {
    // it will run on first render or when t3Value changes
    async function up() {
      setIsUpdate(true);
      await Parse.forceCompile(
        textBuffer,
        setT1Value,
        setT2Value,
        setRowsN,
        t3Value,
        setGraphInfo,
        isDirectedMain,
        true,
        false
      );
      setIsUpdate(false);
    }
    up();
  }, [t3Value]);

  return (
    <React.Fragment>
      <textarea value={t1Value} ref={t1} className="t1" readOnly></textarea>
      <textarea
        value={t2Value}
        ref={t2}
        className="t2"
        autoCorrect={"off"}
        spellCheck={false}
        autoFocus
        readOnly={isAnime}
        onScroll={(e) => {
          t1.current.scrollTop = e.target.scrollTop;
        }}
        onChange={async (e) => {
          setIsUpdate(true);
          await Parse.forceCompile(
            textBuffer,
            setT1Value,
            setT2Value,
            setRowsN,
            e.target.value,
            setGraphInfo,
            isDirectedMain
          );
          setIsUpdate(false);
        }}
      ></textarea>
    </React.Fragment>
  );
};
