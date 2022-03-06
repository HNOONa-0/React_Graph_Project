// changes
// css file now same name as js file
import Konva from "konva";
import React, { Component } from "react";
import { Layer, Stage } from "react-konva";

import NodeLabel from "./stageComponents/NodeLabel";
import Node from "./stageComponents/Node";
import ConnectionLine from "./stageComponents/ConnectionLine";
import ConnectionArrow from "./stageComponents/ConnectionArrow";
// import { Fill, Radius } from "../limits";
import { Fill, Radius } from "../myData/limits";
import Weight from "./stageComponents/Weight";
import "./MyStageStyles.css";

let stageKey = 0;

class MyStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      scale: 1,
      padding: 8,
      tweens: [],
      nodes: [null],
      lines: [],
      arrows: [],
      weights: [],
      labels: [],
    };
    this.stageRef = React.createRef();
    this.shapesLayerRef = React.createRef();
    this.connectionsLayerRef = React.createRef();
    this.movingCircleRef = React.createRef();
    this.movingLineRef = React.createRef();
    this.movingArrowRef = React.createRef();
    this.labelBoxRef = React.createRef();
    this.container = React.createRef();

    // this.resizeObserver = null;
    // console.log(props);
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log("component did update");
    if (prevProps.graphInfo !== this.props.graphInfo) {
      this.setState(this.processGraphInfo(prevState), async () => {
        this.props.funcs.setIsUpdate(false);
      });
    } else if (
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height
    ) {
      this.boundGraph();
    }
  }
  componentDidMount() {
    let prevState = this.state;
    this.setState(this.processGraphInfo(prevState), async () => {
      this.props.funcs.setIsUpdate(false);
    });
  }
  componentWillUnmount() {
    // this.props.resizeObserver.disconnect();
  }
  // processGraphInfoAsync = async () => {
  //   let obj = this.processGraphInfo();
  //   return obj;
  // };
  fromAbsToRelative = (pos) => {
    // create rect, get relative position, delete it, return newPos/
    // pos is an absloutePos of a node
    let rect = new Konva.Rect({ x: 0, y: 0 });

    this.shapesLayerRef.current.add(rect);
    rect.absolutePosition(this.handleDragBound({ x: pos.x, y: pos.y }));

    let relPos = rect.position();
    rect.destroy();
    return relPos;
  };
  handleDragBound = (
    pos,
    width = this.props.width,
    height = this.props.height,
    scale = this.state.scale,
    padding = this.state.padding
  ) => {
    let newPos = {
      x:
        pos.x < padding * scale
          ? padding * scale
          : pos.x + (60 + padding) * scale > width - 2
          ? width - 2 - (60 + padding) * scale
          : pos.x,
      y:
        pos.y < padding * scale
          ? padding * scale
          : pos.y + (60 + padding) * scale > height - 2
          ? height - 2 - (60 + padding) * scale
          : pos.y,
    };
    // console.log(newPos);
    return newPos;
  };
  randomPos = (width = this.props.width, height = this.props.height) => {
    let pos = this.fromAbsToRelative(
      this.handleDragBound({
        x: Math.random() * width,
        y: Math.random() * height,
      })
    );
    // do something with pos if you like to
    return pos;
  };
  onNodeMove = (key) => {
    this.setState((prevState) => ({
      lines: prevState.lines.map((eachLine) => {
        if (
          eachLine.relatedNodes.from !== key &&
          eachLine.relatedNodes.to !== key
        )
          return eachLine;
        return {
          ...eachLine,
          lineProps: {
            ...eachLine.lineProps,
            points: ConnectionLine.moveConnection(
              eachLine.relatedNodes.from,
              eachLine.relatedNodes.to,
              null,
              null,
              this.shapesLayerRef
            ),
          },
        };
      }),
      arrows: prevState.arrows.map((eachArrow) => {
        if (
          eachArrow.relatedNodes.from !== key &&
          eachArrow.relatedNodes.to !== key
        )
          return eachArrow;
        return {
          ...eachArrow,
          arrowProps: {
            ...eachArrow.arrowProps,
            points: ConnectionLine.moveConnection(
              eachArrow.relatedNodes.from,
              eachArrow.relatedNodes.to,
              null,
              null,
              this.shapesLayerRef
            ),
          },
        };
      }),
      weights: prevState.weights.map((eachWeight) => {
        if (
          eachWeight.relatedNodes.from !== key &&
          eachWeight.relatedNodes.to !== key
        )
          return eachWeight;

        let angle = Weight.angleOfRotation(
          eachWeight.relatedNodes.from,
          eachWeight.relatedNodes.to,
          null,
          null,
          this.shapesLayerRef
        );

        let w = eachWeight.textProps.width;
        let m = ConnectionLine.getLineMidpoint(
          eachWeight.relatedNodes.from,
          eachWeight.relatedNodes.to,
          null,
          null,
          this.shapesLayerRef
        );
        // console.log(angle * (Math.PI / 180))

        return {
          ...eachWeight,
          textProps: {
            ...eachWeight.textProps,
            x: m.x - (w / 2) * Math.cos(angle),
            y: m.y - (w / 2) * Math.sin(angle),
            rotation: angle * (180 / Math.PI),
          },
        };
      }),
      labels: prevState.labels.map((eachLabel) => {
        if (eachLabel.groupProps.key !== key) return eachLabel;
        const { x, y } = {
          ...this.shapesLayerRef.current
            .findOne("." + key.toString() + "group")
            .position(),
        };
        return {
          ...eachLabel,
          groupProps: {
            ...eachLabel.groupProps,
            x: x + Radius - eachLabel.groupProps.width / 2,
            y: y + 2 * Radius,
          },
        };
      }),
    }));
  };
  onNodeDragEnd = (e, key) => {
    this.setState((prevState) => ({
      nodes: prevState.nodes.map((eachNode) => {
        if (eachNode === null || eachNode.groupProps.key !== key)
          return eachNode;
        // let scale = prevState.scale;
        // console.log(e.target.position());
        // console.log(e.target.absolutePosition());
        // console.log(this.props.width);
        // console.log(this.props.height);
        // console.log(this.props.width * scale);
        // console.log(this.props.height * scale);
        // console.log(this.props.width / scale - prevState.margin / scale);
        // console.log(this.props.height / scale - prevState.margin / scale);

        return {
          ...eachNode,
          groupProps: {
            ...eachNode.groupProps,
            x: e.target.x(),
            y: e.target.y(),
          },
        };
      }),
    }));
  };
  processGraphInfo = (prevState) => {
    if (!prevState) {
      console.log("no prevstate");
      return null;
    }
    const { x, y, padding, scale } = prevState;

    const { graphInfo, funcs } = this.props;
    const { graph, weight, keyMaster } = graphInfo;
    const numOfNodes = graphInfo.getNumOfNodes();

    const indexToKey = keyMaster.indexToKey;
    const keyToIndex = keyMaster.keyToIndex;
    const edgeStack = graph.edgeStack;
    const weightStack = weight.weightStack;
    const indexToLabel = keyMaster.indexToLabel;

    let nodes = [null];
    const oldNodes = prevState.nodes;

    // make nodes first
    for (let i = 1; i < numOfNodes; i++) {
      // newPos might be old pos in disguise
      let newPos =
        i < oldNodes.length
          ? { x: oldNodes[i].groupProps.x, y: oldNodes[i].groupProps.y }
          : this.randomPos();
      nodes.push(Node.addNode(newPos, indexToKey[i], i));
    }

    // make the lines and arrows;
    let lines = [];
    let arrows = [];

    for (let i = 1; i < numOfNodes; i++) {
      for (let j = 1; j < numOfNodes; j++) {
        if (!edgeStack[i][j].length) continue;
        const from = i;
        const to = j;
        const { isDirected, isForward } =
          edgeStack[i][j][edgeStack[i][j].length - 1];
        if (!isDirected)
          lines.push(
            ConnectionLine.addLine(
              from,
              to,
              {
                x: nodes[from].groupProps.x + Radius,
                y: nodes[from].groupProps.y + Radius,
              },
              {
                x: nodes[to].groupProps.x + Radius,
                y: nodes[to].groupProps.y + Radius,
              },
              this.shapesLayerRef
            )
          );
        else if (isForward)
          arrows.push(
            ConnectionArrow.addArrow(
              from,
              to,
              {
                x: nodes[from].groupProps.x + Radius,
                y: nodes[from].groupProps.y + Radius,
              },
              {
                x: nodes[to].groupProps.x + Radius,
                y: nodes[to].groupProps.y + Radius,
              },
              this.shapesLayerRef
            )
          );
        else
          arrows.push(
            ConnectionArrow.addArrow(
              to,
              from,
              {
                x: nodes[to].groupProps.x + Radius,
                y: nodes[to].groupProps.y + Radius,
              },
              {
                x: nodes[from].groupProps.x + Radius,
                y: nodes[from].groupProps.y + Radius,
              },
              this.shapesLayerRef
            )
          );
      }
    }

    // make the labels
    let labels = [];
    for (let i = 1; i < numOfNodes; i++) {
      if (!indexToLabel[i].length) continue;
      labels.push(
        NodeLabel.addLabel(
          indexToLabel[i][indexToLabel[i].length - 1],
          {
            x: nodes[i].groupProps.x,
            y: nodes[i].groupProps.y,
          },
          i,
          0,
          this.shapesLayerRef
        )
      );
    }
    // make the weights
    let weights = [];
    for (let i = 1; i < numOfNodes; i++) {
      for (let j = 1; j < numOfNodes; j++) {
        if (!weightStack[i][j].length) continue;
        const w = weightStack[i][j][weightStack[i][j].length - 1];
        const from = i;
        const to = j;
        weights.push(
          Weight.addWeight(
            w,
            from,
            to,
            {
              x: nodes[from].groupProps.x + Radius,
              y: nodes[from].groupProps.y + Radius,
            },
            {
              x: nodes[to].groupProps.x + Radius,
              y: nodes[to].groupProps.y + Radius,
            },
            this.shapesLayerRef
          )
        );
      }
    }
    return { x, y, scale, padding, nodes, arrows, lines, weights, labels };
  };
  boundGraph = () => {
    let nodes = this.boundNodes();
    this.repositionNodes(nodes);
  };
  scatterGraph = () => {
    let nodes = this.scatterNodes();
    this.repositionNodes(nodes);
  };

  treeGraph = () => {
    // works but you may need to manually scale then make a tree, because sometimes they get sticky
    let nodes = this.completeTree();
    this.repositionNodes(nodes);
  };
  completeTree = (roots = this.props.graphInfo.getTreeRootsData()) => {
    // console.log(roots);
    if (this.state.nodes.length <= 1) return [null];

    let totalX = 0;
    let maxY = 0;
    for (const root of roots) {
      const { mp, X, Y } = root;

      totalX += !X ? 1 : X;
      maxY = Math.max(maxY, Y);
    }

    // console.log(maxY);
    const scale = this.state.scale;
    const padding = this.state.padding + Radius;

    const treeUnitWidth = (this.props.width - 2) / totalX;
    const treeUnitHeight =
      (this.props.height - 2 - 2 * padding * scale) / Math.max(maxY, 1);
    let nodes = [...this.state.nodes];
    let widthSoFar = 0;

    for (const { mp, X, Y } of roots) {
      const allowedWidth = treeUnitWidth * (!X ? 1 : X);
      for (const [key, pos] of mp) {
        const width = allowedWidth - 2 * padding * scale;
        const unitWidth = width / (!X ? 1 : X);

        const [xOnStage, yOnStage] = [pos.x, pos.y];
        const { x, y } = this.fromAbsToRelative({
          x:
            widthSoFar +
            (padding - Radius) * scale +
            (!X ? 0.5 : xOnStage) * unitWidth,
          y: (padding - Radius) * scale + yOnStage * treeUnitHeight,
        });
        nodes[key] = {
          ...nodes[key],
          groupProps: { ...nodes[key].groupProps, x, y },
        };
      }
      widthSoFar += allowedWidth;
    }
    return nodes;
  };
  scatterNodes = () => {
    let nodes = this.state.nodes;

    // let curAbsPos;
    // let newAbsPos;
    let newRelPos;
    nodes = nodes.map((eachNode) => {
      if (!eachNode) return null;

      newRelPos = this.randomPos();
      return {
        ...eachNode,
        groupProps: { ...eachNode.groupProps, x: newRelPos.x, y: newRelPos.y },
      };
    });
    return nodes;
  };
  boundNodes = () => {
    let nodes = this.state.nodes;

    let curAbsPos;
    let newAbsPos;
    let newRelPos;

    nodes = nodes.map((eachNode) => {
      if (!eachNode) return null;
      curAbsPos = this.shapesLayerRef.current
        .findOne("." + eachNode.groupProps.key.toString() + "group")
        .absolutePosition();
      newAbsPos = this.handleDragBound(curAbsPos);
      newRelPos = this.fromAbsToRelative(newAbsPos);
      return {
        ...eachNode,
        groupProps: { ...eachNode.groupProps, x: newRelPos.x, y: newRelPos.y },
      };
    });

    return nodes;
  };
  scatter = (e) => {
    // this.repositionGraph(2);
    this.scatterGraph();
  };
  resetScale = () => {
    this.setState({ x: 0, y: 0, scale: 1 }, async () => {
      // this.repositionGraph(1)
      this.boundGraph();
    });
  };
  tree = (mp, X, Y) => {
    // this.repositionGraph(3);
    this.treeGraph(mp, X, Y);
  };
  repositionNodes = (nodes) => {
    let from, to, k;

    let lines = this.state.lines.map((eachLine) => {
      from = eachLine.relatedNodes.from;
      to = eachLine.relatedNodes.to;
      return {
        ...eachLine,
        lineProps: {
          ...eachLine.lineProps,
          points: ConnectionLine.moveConnection(
            from,
            to,
            {
              x: nodes[from].groupProps.x + Radius,
              y: nodes[from].groupProps.y + Radius,
            },
            {
              x: nodes[to].groupProps.x + Radius,
              y: nodes[to].groupProps.y + Radius,
            },
            this.shapesLayerRef
          ),
        },
      };
    });
    let arrows = this.state.arrows.map((eachArrow) => {
      from = eachArrow.relatedNodes.from;
      to = eachArrow.relatedNodes.to;
      return {
        ...eachArrow,
        arrowProps: {
          ...eachArrow.arrowProps,
          points: ConnectionLine.moveConnection(
            from,
            to,
            {
              x: nodes[from].groupProps.x + Radius,
              y: nodes[from].groupProps.y + Radius,
            },
            {
              x: nodes[to].groupProps.x + Radius,
              y: nodes[to].groupProps.y + Radius,
            },
            this.shapesLayerRef
          ),
        },
      };
    });
    let weights = this.state.weights.map((eachWeight) => {
      from = eachWeight.relatedNodes.from;
      to = eachWeight.relatedNodes.to;

      let angle = Weight.angleOfRotation(
        from,
        to,
        {
          x: nodes[from].groupProps.x + Radius,
          y: nodes[from].groupProps.y + Radius,
        },
        {
          x: nodes[to].groupProps.x + Radius,
          y: nodes[to].groupProps.y + Radius,
        },
        this.shapesLayerRef
      );

      let w = eachWeight.textProps.width;
      let m = ConnectionLine.getLineMidpoint(
        from,
        to,
        {
          x: nodes[from].groupProps.x + Radius,
          y: nodes[from].groupProps.y + Radius,
        },
        {
          x: nodes[to].groupProps.x + Radius,
          y: nodes[to].groupProps.y + Radius,
        },
        this.shapesLayerRef
      );
      return {
        ...eachWeight,
        textProps: {
          ...eachWeight.textProps,
          x: m.x - (w / 2) * Math.cos(angle),
          y: m.y - (w / 2) * Math.sin(angle),
          rotation: angle * (180 / Math.PI),
        },
      };
    });
    let labels = this.state.labels.map((eachLabel) => {
      k = eachLabel.groupProps.key;
      return {
        ...eachLabel,
        groupProps: {
          ...eachLabel.groupProps,
          x: nodes[k].groupProps.x + Radius - eachLabel.groupProps.width / 2,
          y: nodes[k].groupProps.y + 2 * Radius,
        },
      };
    });
    this.setState({ nodes, lines, arrows, weights, labels });
  };
  handleWheel = (e) => {
    e.evt.preventDefault();
    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();

    const { x: pointerX, y: pointerY } = stage.getPointerPosition();
    const mousePointTo = {
      x: (pointerX - stage.x()) / oldScale,
      y: (pointerY - stage.y()) / oldScale,
    };
    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    const newPos = {
      x: pointerX - mousePointTo.x * newScale,
      y: pointerY - mousePointTo.y * newScale,
    };

    this.setState({ scale: newScale, x: newPos.x, y: newPos.y }, async () => {
      // this.repositionGraph(1);
      this.boundGraph();
    });
  };
  downloadURI = (
    uri = this.stageRef.current.toDataURL(),
    name = "stage" + (++stageKey).toString() + ".png"
  ) => {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // delete link;
  };
  resetAllColors = async (
    n,
    timer = (ms) => new Promise((res) => setTimeout(res, ms))
  ) => {
    const timeToWait = 1;
    for (let i = 1; i < n; i++) {
      this.shapesLayerRef.current
        .findOne("." + i.toString() + "groupCircle")
        .to({
          fill: Fill,
          duration: timeToWait,
        });
    }
    if (n > 1) await timer(timeToWait * 1000);
  };
  BFS = async (timer = (ms) => new Promise((res) => setTimeout(res, ms))) => {
    // console.log("bfs called");

    const timeToWait = 1;
    const graphInfo = this.props.graphInfo;
    const { setIsAnime } = this.props.funcs;
    setIsAnime(true);

    // console.log(graphInfo.completeBFS());
    // console.log(graphInfo.completeDFS());
    // const paths = graphInfo.getBFSPath();
    // console.log(path);

    // const BFSPaths = graphInfo.completeBFS();
    const BFSPaths = graphInfo.completeTreeRootsBFS();
    // console.log(BFSPaths);
    // console.log(graphInfo.completeTreeRootsBFS());

    const n = graphInfo.getNumOfNodes();

    for (let i = 0; i < BFSPaths.length; i++) {
      const curBFSPath = BFSPaths[i];
      // curBFSPath is a 2d array

      for (let j = 0; j < curBFSPath.length; j++) {
        for (let k = 0; k < curBFSPath[j].length; k++) {
          this.shapesLayerRef.current
            .findOne("." + curBFSPath[j][k].toString() + "groupCircle")
            .to({
              fill: !j ? "pink" : "orange",
              duration: timeToWait,
            });
        }
        await timer(timeToWait * 1000);
      }
      // await timer(curBFSPath.length * (timeToWait * 1000));
    }
    this.resetAllColors(n);
    setIsAnime(false);
  };
  DFS = async (timer = (ms) => new Promise((res) => setTimeout(res, ms))) => {
    // console.log("dfs called");
    const timeToWait = 1;
    const graphInfo = this.props.graphInfo;
    const { setIsAnime } = this.props.funcs;
    setIsAnime(true);

    // const DFSPaths = graphInfo.completeDFS();
    const DFSPaths = graphInfo.completeTreeRootsDFS();

    // console.log(DFSPaths);
    // console.log(graphInfo.completeRootsDFS());

    const n = this.props.graphInfo.getNumOfNodes();

    for (let i = 0; i < DFSPaths.length; i++) {
      const curDFSPath = DFSPaths[i];
      let pathStack = [];

      for (let j = 0; j < curDFSPath.length; j++) {
        let isStackTop = !pathStack.length
          ? false
          : pathStack[pathStack.length - 1] === curDFSPath[j]
          ? true
          : false;

        this.shapesLayerRef.current
          .findOne("." + curDFSPath[j].toString() + "groupCircle")
          .to({
            fill: !j ? "pink" : isStackTop ? "lime" : "orange",
            duration: timeToWait,
          });
        if (isStackTop) pathStack.pop();
        else pathStack.push(curDFSPath[j]);
        await timer(timeToWait * 1000);
      }
    }

    this.resetAllColors(n);
    setIsAnime(false);
  };

  render() {
    // on mouse up doesnt work when the draggable object moves, because draggable property?
    return (
      <Stage
        height={this.props.height - 2}
        width={this.props.width - 2}
        ref={this.stageRef}
        scaleX={this.state.scale}
        scaleY={this.state.scale}
        onWheel={(e) => this.handleWheel(e)}
      >
        <Layer ref={this.connectionsLayerRef}>
          {this.state.lines.map((eachLine) => {
            return (
              <ConnectionLine
                key={eachLine.lineProps.key}
                lineProps={eachLine.lineProps}
              />
            );
          })}
          {this.state.arrows.map((eachArrow) => {
            return (
              <ConnectionArrow
                key={eachArrow.arrowProps.key}
                arrowProps={eachArrow.arrowProps}
              />
            );
          })}
          {this.state.weights.map((eachWeight) => {
            return (
              <Weight
                key={eachWeight.textProps.key}
                textProps={eachWeight.textProps}
              />
            );
          })}
        </Layer>
        <Layer ref={this.shapesLayerRef}>
          {this.state.nodes.map((eachNode) => {
            if (!eachNode || !eachNode.groupProps.key) return null;
            return (
              <Node
                key={eachNode.groupProps.key}
                shapeProps={eachNode}
                dragBoundFunc={this.handleDragBound}
                onDragMove={this.onNodeMove}
                onDragEnd={this.onNodeDragEnd}
              />
            );
          })}
          {this.state.labels.map((eachLabel) => {
            return (
              <NodeLabel
                key={eachLabel.groupProps.key}
                shapeProps={eachLabel}
              />
            );
          })}
        </Layer>
      </Stage>
    );
  }
}
export default MyStage;
