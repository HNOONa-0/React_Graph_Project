import Konva from "konva";
import React, { Component } from "react";
import { Layer, Stage, Text, Group, Circle, Rect, Line } from "react-konva";
import "./Stage1Styles.css";

import NodeLabel from "./stageComponents/NodeLabel";
import Node from "./stageComponents/Node";
import ConnectionLine from "./stageComponents/ConnectionLine";
import ConnectionArrow from "./stageComponents/ConnectionArrow";
import { Fill, FontSize, FontType, Radius } from "../limits";
import Weight from "./stageComponents/Weight";

// let lineKey = 0;
// let arrowKey = 0;
// let weightKey = 0;
// let f = 0;
let stageKey = 0;

export class Stage1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      scale: 1,
      margin: 8,
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
    this.resizeObserver = null;

    // console.log(props);
    // this.buildGraph(this.state, props);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.graphInfo !== this.props.graphInfo) {
      // its going to update once
      // console.log("component did update");
      this.buildGraph(prevState, this.props);
    }
  }
  componentDidMount() {
    this.resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].target.offsetWidth;
      const height = entries[0].target.offsetHeight;
      this.setState({ width, height }, async () => {
        this.boundGraph();
      });
    });
    this.resizeObserver.observe(document.getElementById("mein-stage"));
  }
  componentWillUnmount() {
    this.resizeObserver.disconnect();
  }
  // addNode = (pos, name, idx, c = 0) => {
  //     return {
  //         groupProps: {
  //             key:idx, name: idx.toString() + "group",
  //             x: pos.x + c, y: pos.y + c,
  //             width: 2 * Radius, height: 2 * Radius, draggable: true
  //         },
  //         circleProps: {
  //             name: idx.toString() + "groupCircle",
  //             x: Radius, y: Radius, radius: Radius,
  //             fill: Fill, stroke: null
  //         },
  //         textProps: {
  //             name: idx.toString() + "groupText", x: 0, y: 0,
  //             width: 2 * Radius, height: 2 * Radius,
  //             text: name, align: "center", verticalAlign: "middle",
  //             fontFamily: FontType, fontSize: FontSize
  //         }
  //     }
  // }
  // addLine = (from, to, pos1 = null, pos2 = null) => {
  //     return {
  //         lineProps: {
  //             key: ++lineKey, name: lineKey.toString() + "line",
  //             points: this.moveConnection(from, to, pos1, pos2)
  //         },
  //         relatedNodes: { from, to }
  //     }
  // }
  // addArrow = (from, to, pos1 = null, pos2 = null) => {
  //     return {
  //         arrowProps: {
  //             key: ++arrowKey, name: arrowKey.toString() + "arrow",
  //             points: this.moveConnection(from, to, pos1, pos2)
  //         },
  //         relatedNodes: { from, to }
  //     }
  // }
  // addWeight = (w, from, to, pos1 = null, pos2 = null) => {
  //     let weightText = w.toString()

  //     let text = new Konva.Text({ fontSize: 20, fontFamily: "sans-serif", text: weightText })
  //     this.shapesLayerRef.current.add(text)

  //     let m = this.getLineMidpoint(from, to, pos1, pos2)
  //     let angle = this.angleOfRotation(from, to, pos1, pos2)

  //     const newWeight = {
  //         textProps: {
  //             key: ++weightKey, name: weightKey.toString() + "weight",
  //             x: m.x - ((text.width() / 2) * Math.cos(angle)),
  //             y: m.y - ((text.width() / 2) * Math.sin(angle)),
  //             rotation: angle * (180 / Math.PI), width: text.width(),
  //             text: weightText, fontSize: 20, fontFamily: "sans-serif"
  //         },
  //         relatedNodes: { from, to }
  //     }

  //     text.destroy()
  //     return newWeight
  // }
  // addLabel = (t, pos, idx, c = 0) => {

  //     let text = new Konva.Text({ fontSize: FontSize, fontFamily: "sans-serif", text: t })
  //     this.shapesLayerRef.current.add(text)

  //     const newLabel = {
  //         groupProps: {
  //             key: idx, name: idx.toString() + "label",
  //             width: text.width(), height: FontSize, x: pos.x + Radius - (text.width() / 2), y: pos.y + 2 * Radius
  //         },
  //         rectProps: {
  //             name: idx.toString() + "labelRect",
  //             fill: Fill, opacity: 0.5, width: text.width(), height: FontSize
  //         },
  //         textProps: {
  //             name: idx.toString() + "labelText",
  //             text: t, width: text.width(), fontSize: FontSize, fontFamily: "sans-serif", align: 'center'
  //         }
  //     }

  //     text.destroy()
  //     return newLabel
  // }
  // getPosOfNodeCenter = (key) => {
  //     const oldPos = this.shapesLayerRef.current.findOne("." + key.toString() + "group").position()
  //     let newPos = { ...oldPos }
  //     newPos.x += Radius;
  //     newPos.y += Radius;
  //     return newPos;
  // }
  // getLineMidpoint = (key1, key2, p1 = null, p2 = null) => {
  //     let pos1 = p1 !== null ? p1 : this.getPosOfNodeCenter(key1)
  //     let pos2 = p2 !== null ? p2 : this.getPosOfNodeCenter(key2)

  //     return { x: (pos1.x + pos2.x) / 2, y: (pos1.y + pos2.y) / 2 }
  // }
  // angleOfRotation = (key1, key2, p1 = null, p2 = null) => {
  //     let pos1 = p1 !== null ? p1 : this.getPosOfNodeCenter(key1)
  //     let pos2 = p2 !== null ? p2 : this.getPosOfNodeCenter(key2)

  //     let angle = Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x)
  //     return angle > Math.PI / 2 || angle < -Math.PI / 2 ? angle + Math.PI : angle;
  // }
  // moveConnection = (key1, key2, p1 = null, p2 = null) => {
  //     let pos1 = p1 !== null ? p1 : this.getPosOfNodeCenter(key1)
  //     let pos2 = p2 !== null ? p2 : this.getPosOfNodeCenter(key2)
  //     let angle = Math.atan2(-1 * (pos2.y - pos1.y), (pos2.x - pos1.x));

  //     return [
  //         pos1.x + -Radius * Math.cos(angle + Math.PI), pos1.y + Radius * Math.sin(angle + Math.PI),
  //         pos2.x + -Radius * Math.cos(angle), pos2.y + Radius * Math.sin(angle)]
  // }
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
    width = this.state.width,
    height = this.state.height,
    scale = this.state.scale,
    margin = this.state.margin
  ) => {
    let newPos = {
      x:
        pos.x < margin * scale
          ? margin * scale
          : pos.x + (60 + margin) * scale > width - 2
          ? width - 2 - (60 + margin) * scale
          : pos.x,
      y:
        pos.y < margin * scale
          ? margin * scale
          : pos.y + (60 + margin) * scale > height - 2
          ? height - 2 - (60 + margin) * scale
          : pos.y,
    };

    return newPos;
  };
  randomPos = (width = this.state.width, height = this.state.height) => {
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

        // console.log(e.target.position());
        // console.log(e.target.absolutePosition());
        // console.log(prevState.width);
        // console.log(prevState.width / prevState.scale);
        // console.log(prevState.height);
        // console.log(prevState.height / prevState.scale);

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
  buildGraph = (prevState, props) => {
    // console.log(props.graphInfo);
    const { graph, weight, keyMaster } = props.graphInfo;
    const numOfNodes = props.graphInfo.getNumOfNodes();

    const indexToKey = keyMaster.indexToKey;
    const keyToIndex = keyMaster.keyToIndex;
    const edgeStack = graph.edgeStack;
    const weightStack = weight.weightStack;
    const indexToLabel = keyMaster.indexToLabel;

    let newNodes = [null];
    const oldNodes = prevState.nodes;
    // make nodes first
    for (let i = 1; i < numOfNodes; i++) {
      // newPos might be old pos in disguise
      let newPos =
        i < oldNodes.length
          ? { x: oldNodes[i].groupProps.x, y: oldNodes[i].groupProps.y }
          : this.randomPos();
      newNodes.push(Node.addNode(newPos, indexToKey[i], i));
    }
    // make the lines and arrows;
    let newLines = [];
    let newArrows = [];
    for (let i = 1; i < numOfNodes; i++) {
      for (let j = 1; j < numOfNodes; j++) {
        if (!edgeStack[i][j].length) continue;
        const from = i;
        const to = j;
        const { isDirected, isForward } =
          edgeStack[i][j][edgeStack[i][j].length - 1];
        if (!isDirected)
          newLines.push(
            ConnectionLine.addLine(
              from,
              to,
              {
                x: newNodes[from].groupProps.x + Radius,
                y: newNodes[from].groupProps.y + Radius,
              },
              {
                x: newNodes[to].groupProps.x + Radius,
                y: newNodes[to].groupProps.y + Radius,
              },
              this.shapesLayerRef
            )
          );
        else if (isForward)
          newArrows.push(
            ConnectionArrow.addArrow(
              from,
              to,
              {
                x: newNodes[from].groupProps.x + Radius,
                y: newNodes[from].groupProps.y + Radius,
              },
              {
                x: newNodes[to].groupProps.x + Radius,
                y: newNodes[to].groupProps.y + Radius,
              },
              this.shapesLayerRef
            )
          );
        else
          newArrows.push(
            ConnectionArrow.addArrow(
              to,
              from,
              {
                x: newNodes[to].groupProps.x + Radius,
                y: newNodes[to].groupProps.y + Radius,
              },
              {
                x: newNodes[from].groupProps.x + Radius,
                y: newNodes[from].groupProps.y + Radius,
              },
              this.shapesLayerRef
            )
          );
      }
    }
    // make the labels
    let newLabels = [];
    for (let i = 1; i < numOfNodes; i++) {
      if (!indexToLabel[i].length) continue;
      newLabels.push(
        NodeLabel.addLabel(
          indexToLabel[i][indexToLabel[i].length - 1],
          {
            x: newNodes[i].groupProps.x,
            y: newNodes[i].groupProps.y,
          },
          i,
          0,
          this.shapesLayerRef
        )
      );
    }
    // make the weights
    let newWeights = [];
    for (let i = 1; i < numOfNodes; i++) {
      for (let j = 1; j < numOfNodes; j++) {
        if (!weightStack[i][j].length) continue;
        const w = weightStack[i][j][weightStack[i][j].length - 1];
        const from = i;
        const to = j;
        newWeights.push(
          Weight.addWeight(
            w,
            from,
            to,
            {
              x: newNodes[from].groupProps.x + Radius,
              y: newNodes[from].groupProps.y + Radius,
            },
            {
              x: newNodes[to].groupProps.x + Radius,
              y: newNodes[to].groupProps.y + Radius,
            },
            this.shapesLayerRef
          )
        );
      }
    }
    this.setState({
      nodes: newNodes,
      lines: newLines,
      arrows: newArrows,
      labels: newLabels,
      weights: newWeights,
    });
  };
  boundGraph = () => {
    let nodes = this.boundNodes();
    this.repositionNodes(nodes);
  };
  scatterGraph = () => {
    let nodes = this.scatterNodes();
    this.repositionNodes(nodes);
  };
  treeGraph = (mp, X, Y) => {
    let nodes = this.treeNodes(mp, X, Y);
    this.repositionNodes(nodes);
  };
  treeNodes = (mp, X, Y) => {
    // padding of 50px on up down left and right
    // erraneous when scaling, dont know why
    let nodes = this.state.nodes;

    const scale = this.state.scale;

    const padding = 50 * scale;
    const width = this.state.width - 2 - 2 * padding;
    const height = this.state.height - 2 - 2 * padding;

    const unitWidth = width / Math.max(X, 1);
    const unitHeight = height / Math.max(Y, 1);

    nodes = nodes.map((eachNode) => {
      if (!eachNode) return null;

      let xOnStage = mp.get(eachNode.groupProps.key).x;
      let yOnStage = mp.get(eachNode.groupProps.key).y;
      let newPos = this.fromAbsToRelative({
        x: padding + xOnStage * unitWidth - Radius,
        y: padding + yOnStage * unitHeight - Radius,
      });

      return {
        ...eachNode,
        groupProps: { ...eachNode.groupProps, x: newPos.x, y: newPos.y },
      };
    });
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

      let w = this.connectionsLayerRef.current
        .findOne("." + eachWeight.textProps.key.toString() + "weight")
        .width();
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
  BFS = async (timer = (ms) => new Promise((res) => setTimeout(res, ms))) => {
    console.log("bfs called");

    const graphInfo = this.props.graphInfo;
    const setIsAnime = this.props.setIsAnime;

    setIsAnime(true);
    const n = this.props.graphInfo.getNumOfNodes();
    const path = graphInfo.getBFSPath();

    const timeToWait = 1;

    for (let i = 0; path[i].length > 0; i++) {
      for (let j = 0; j < path[i].length; j++) {
        this.shapesLayerRef.current
          .findOne("." + path[i][j].toString() + "groupCircle")
          .to({
            fill: i === 0 ? "pink" : "orange",
            duration: timeToWait,
          });
      }
      await timer(timeToWait * 1000);
    }
    for (let i = 1; i < n; i++) {
      this.shapesLayerRef.current
        .findOne("." + i.toString() + "groupCircle")
        .to({
          fill: Fill,
          duration: 1,
        });
    }
    if (path.length) await timer(timeToWait * 1000);
    setIsAnime(false);
  };
  DFS = async (timer = (ms) => new Promise((res) => setTimeout(res, ms))) => {
    console.log("dfs called");
    const graphInfo = this.props.graphInfo;
    const setIsAnime = this.props.setIsAnime;

    setIsAnime(true);
    const n = this.props.graphInfo.getNumOfNodes();
    const path = graphInfo.getDFSPath();

    const timeToWait = 1;
    let pathStack = [];

    for (let i = 0; i < path.length; i++) {
      let isStackTop = !pathStack.length
        ? false
        : pathStack[pathStack.length - 1] === path[i]
        ? true
        : false;

      this.shapesLayerRef.current
        .findOne("." + path[i].toString() + "groupCircle")
        .to({
          fill: i === 0 ? "pink" : isStackTop ? "lime" : "orange",
          duration: timeToWait,
        });

      if (isStackTop) pathStack.pop();
      else pathStack.push(path[i]);
      await timer(timeToWait * 1000);
    }
    for (let i = 1; i < n; i++) {
      this.shapesLayerRef.current
        .findOne("." + i.toString() + "groupCircle")
        .to({
          fill: Fill,
          duration: timeToWait,
        });
    }
    if (path.length) await timer(timeToWait * 1000);
    setIsAnime(false);
  };

  render() {
    // on mouse up doesnt work when the draggable object moves, because draggable property?
    return (
      <div className="stage-div" id={"mein-stage"}>
        <Stage
          height={this.state.height - 2}
          width={this.state.width - 2}
          ref={this.stageRef}
          scaleX={this.state.scale}
          scaleY={this.state.scale}
          onWheel={(e) => this.handleWheel(e)}
        >
          <Layer ref={this.connectionsLayerRef}>
            {this.state.lines.map((eachLine) => {
              return (
                <ConnectionLine key={eachLine.lineProps.key} props={eachLine} />
              );
            })}
            {this.state.arrows.map((eachArrow) => {
              // console.log(eachArrow);
              return (
                <ConnectionArrow
                  key={eachArrow.arrowProps.key}
                  props={eachArrow}
                />
              );
            })}
            {this.state.weights.map((eachWeight) => {
              return (
                <Text
                  key={eachWeight.textProps.key}
                  {...eachWeight.textProps}
                />
              );
            })}
          </Layer>
          <Layer ref={this.shapesLayerRef}>
            {this.state.nodes.map((eachNode) => {
              if (eachNode === null || !eachNode.groupProps.key) return null;
              return (
                <Node
                  key={eachNode.groupProps.key}
                  props={eachNode}
                  dragBoundFunc={this.handleDragBound}
                  onDragMove={this.onNodeMove}
                  onDragEnd={this.onNodeDragEnd}
                />
              );
            })}
            {this.state.labels.map((eachLabel) => {
              // if (eachNode === null) return null
              return (
                <NodeLabel key={eachLabel.groupProps.key} props={eachLabel} />
              );
            })}
          </Layer>
        </Stage>
      </div>
    );
  }
}
// A1 = async () => {
//   const graphInfo = this.props.graphInfo;
//   const n = this.props.graphInfo.getNumOfNodes();

//   const path1 = graphInfo.getDFSPath();
//   const path2 = graphInfo.getBFSPath();

//   const timer = (ms) => new Promise((res) => setTimeout(res, ms));
//   let pathStack = [];

//   for (let i = 0; i < path1.length; i++) {
//     let isStackTop = !pathStack.length
//       ? false
//       : pathStack[pathStack.length - 1] === path1[i]
//       ? true
//       : false;

//     this.shapesLayerRef.current
//       .findOne("." + path1[i].toString() + "groupCircle")
//       .to({
//         fill: i === 0 ? "pink" : isStackTop ? "lime" : "orange",
//         duration: timeToWait,
//       });

//     if (isStackTop) pathStack.pop();
//     else pathStack.push(path1[i]);
//     await timer(timeToWait * 1000);
//   }
//   for (let i = 1; i < n; i++) {
//     this.shapesLayerRef.current
//       .findOne("." + i.toString() + "groupCircle")
//       .to({
//         fill: Fill,
//         duration: 1,
//       });
//   }
//   await timer(timeToWait * 1000);

//   for (let i = 0; path2[i].length > 0; i++) {
//     for (let j = 0; j < path2[i].length; j++) {
//       this.shapesLayerRef.current
//         .findOne("." + path2[i][j].toString() + "groupCircle")
//         .to({
//           fill: i === 0 ? "pink" : "orange",
//           duration: timeToWait,
//         });
//     }
//     await timer(timeToWait * 1000);
//   }
//   for (let i = 1; i < n; i++) {
//     this.shapesLayerRef.current
//       .findOne("." + i.toString() + "groupCircle")
//       .to({
//         fill: Fill,
//         duration: 1,
//       });
//   }
//   await timer(timeToWait * 1000);
// };
