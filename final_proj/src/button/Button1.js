import React from "react";
import "./Button1Styles.css";
export const Button1 = (props) => {
  // console.log(isDirectedMain)
  const {
    resetScale,
    scatter,
    loadRandomDemo,
    tree,
    setIsDirectedMain,
    downloadURI,
    animateBFS,
    animateDFS,
  } = props.funcs;
  const isUpdate = props.isUpdate;
  const isAnime = props.isAnime;
  const isDirectedMain = props.isDirectedMain;
  return (
    <div className="button-div-1">
      <div className="button-div-2">
        <button
          className="button-1"
          onClick={() => {
            if (isUpdate || isAnime) return;
            resetScale();
          }}
        >
          Reset scale
        </button>
        <button
          className="button-1"
          onClick={() => {
            if (isUpdate || isAnime) return;
            scatter();
          }}
        >
          Scatter
        </button>
        <button
          className="button-1"
          onClick={() => {
            if (isUpdate || isAnime) return;
            loadRandomDemo();
          }}
        >
          Load random demo
        </button>
        <button
          className="button-1"
          onClick={() => {
            if (isUpdate || isAnime) return;
            animateDFS();
          }}
        >
          DFS
        </button>
        <button
          className="button-1"
          onClick={() => {
            if (isUpdate || isAnime) return;
            animateBFS();
          }}
        >
          BFS
        </button>
      </div>
      <div className="button-div-2">
        <button
          className="button-1"
          onClick={() => {
            if (isUpdate || isAnime) return;
            tree();
          }}
        >
          Tree
        </button>
        <div>
          <button
            className="button-1"
            style={!isDirectedMain ? { filter: "brightness(85%)" } : {}}
            onClick={() => {
              if (isUpdate || isAnime) return;
              if (!isDirectedMain) return;
              setIsDirectedMain(false);
            }}
          >
            Undirected
          </button>
          <button
            className="button-1 button-3"
            style={isDirectedMain ? { filter: "brightness(85%)" } : {}}
            onClick={() => {
              if (isUpdate || isAnime) return;
              if (isDirectedMain) return;
              setIsDirectedMain(true);
            }}
          >
            Directed
          </button>
        </div>
      </div>
      <div className="button-div-2">
        <button
          className="button-1 button-2"
          onClick={() => {
            if (isUpdate || isAnime) return;
            downloadURI();
          }}
        >
          Download as PNG
        </button>
      </div>
    </div>
  );
};
