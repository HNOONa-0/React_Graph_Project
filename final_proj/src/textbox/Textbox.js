// changes
// generic name changes
// t1ValRef & t1EndIndex are now imported functions
import React from "react";
import { Component } from "react";
import Parse from "./parse/Parse";
// import { maxChars, maxLines } from "../limits";
import { maxChars, maxLines } from "../myData/limits";
// import { handleLines, setV2d } from "../utilityFuncs";
import setV2d from "../myUtils/setV2d";
// new textLinesStr & linesEndIndex
import textLinesStr from "../myData/textLinesStr";
import { linesEndIndex } from "../myUtils/setLines";
// import "./textBoxStyles.css";
import "./TextboxStyles.css";
// const t1ValRef = handleLines(maxLines + 100);
// let textBuffer = setV2d(maxLines + 10, maxChars + 10);
let textBuffer = setV2d(maxLines + 10, maxChars + 10, "array", "0");
let myTimer;

class Textbox extends Component {
  constructor(props) {
    super(props);
    this.state = this.processEventString(props.t3Val, false);
    this.t1 = React.createRef();
    this.t2 = React.createRef();
    // console.log(props.t3Val);
    // this.processEventString(props.t3Val, false, false);
    // this works but...., worried about asyncing
    this.setGraphInfo(this.state.rowsN, false);
  }
  // this method is called when a prop or the state changes
  componentDidUpdate(prevProps, prevState) {
    // console.log("i did update");
    if (prevProps.t3Val !== this.props.t3Val) {
      // console.log("updated t3");
      this.processAndSend(this.props.t3Val, false, false);
      //   this.processEventString(this.props.t3Val, true, false);
    } else if (
      prevProps.bools.isDirectedMain !== this.props.bools.isDirectedMain
    ) {
      // console.log("updated is-directed-main");
      this.props.funcs.setIsUpdate(false);
      this.setGraphInfo(this.state.rowsN, false);
    }
  }
  componentWillUnmount() {
    // this.props.resizeObserver.disconnect();
    console.log("textbox unmounted");
    this.props.funcs.updateSavedText(this.state.t2Val);
  }
  setT1Val = (t1Val) => {
    this.setState({ t1Val });
  };
  setT2Val = (t2Val) => {
    this.setState({ t2Val });
  };
  setRowsN = (rowsN) => {
    this.setState({ rowsN });
  };
  processEventString = (s, isDemo = false) => {
    // console.log(this.props.funcs);
    // console.log(this.props.bools);

    const { setIsUpdate } = this.props.funcs;
    // const { setGraphInfo, setIsUpdate } = this.props.funcs;
    // const { isDirectedMain, isUpdate, isAnime } = this.props.bools;

    setIsUpdate(false);
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

    if (!isDemo) {
      s = "";
      for (let i = 0; i <= rows; i++)
        s += textBuffer[i].slice(1, textBuffer[i][0]).join("");
    }
    // this.t1LastIndex(rows + 1)
    return {
      t2Val: s,
      t1Val: textLinesStr.substring(0, linesEndIndex(rows + 1)),
      rowsN: rows + 1,
    };
    // or
    // this.setT1Val(t1ValRef.substring(0, this.t1LastIndex(rows + 1)));
    // this.setT2Val(s);
    // this.setRowsN(rows + 1);
  };
  setGraphInfo = (rowsN, isDelay = true) => {
    const { setGraphInfo } = this.props.funcs;
    const { isDirectedMain } = this.props.bools;
    // const { setGraphInfo, setIsUpdate } = this.props.funcs;
    // const { isDirectedMain, isUpdate, isAnime } = this.props.bools;
    if (isDelay) {
      clearTimeout(myTimer);
      myTimer = setTimeout(() => {
        setGraphInfo(Parse.parseAllLines(textBuffer, rowsN, isDirectedMain));
      }, 350);
    } else {
      setGraphInfo(Parse.parseAllLines(textBuffer, rowsN, isDirectedMain));
    }
  };
  processAndSend = (s = "", isDemo = false, isDelay = true) => {
    const state = this.processEventString(s, isDemo);
    this.setState(state, async () => {
      this.setGraphInfo(state.rowsN, isDelay);
    });
  };
  getCurText = () => {
    return this.state.t2Val;
  };
  render() {
    const state = this.state;
    const { isAnime } = this.props.bools;
    // const { setGraphInfo, isDirectedMain, t3Value, setIsUpdate, isAnime } =
    //   this.props.obj1;
    return (
      <div className="text-area-div">
        <textarea
          className="t1"
          value={state.t1Val}
          ref={this.t1}
          readOnly
        ></textarea>
        <textarea
          value={state.t2Val}
          ref={this.t2}
          className="t2"
          autoCorrect={"off"}
          spellCheck={false}
          readOnly={isAnime}
          onScroll={(e) => {
            this.t1.current.scrollTop = e.target.scrollTop;
          }}
          onChange={(e) => {
            // this.processEventString(e.target.value);
            this.processAndSend(e.target.value);
          }}
        ></textarea>
      </div>
    );
  }
}
export default Textbox;
