import React, { PureComponent } from "react";
import { Line } from "react-konva";
// import { Radius } from "../../limits";
import { Radius } from "../../myData/limits";
import Node from "./Node";

let lineKey = 0;
class ConnectionLine extends PureComponent {
  static addLine(from, to, pos1, pos2, shapesLayerRef) {
    return {
      lineProps: {
        key: ++lineKey,
        name: lineKey.toString() + "line",
        points: this.moveConnection(from, to, pos1, pos2),
      },
      relatedNodes: { from, to },
    };
  }
  static getLineMidpoint(key1, key2, p1, p2, shapesLayerRef) {
    let pos1 = p1 !== null ? p1 : Node.getPosOfNodeCenter(key1, shapesLayerRef);
    let pos2 = p2 !== null ? p2 : Node.getPosOfNodeCenter(key2, shapesLayerRef);

    return { x: (pos1.x + pos2.x) / 2, y: (pos1.y + pos2.y) / 2 };
  }
  static moveConnection(key1, key2, p1, p2, shapesLayerRef) {
    let pos1 = p1 !== null ? p1 : Node.getPosOfNodeCenter(key1, shapesLayerRef);
    let pos2 = p2 !== null ? p2 : Node.getPosOfNodeCenter(key2, shapesLayerRef);
    let angle = Math.atan2(-1 * (pos2.y - pos1.y), pos2.x - pos1.x);

    return [
      pos1.x + -Radius * Math.cos(angle + Math.PI),
      pos1.y + Radius * Math.sin(angle + Math.PI),
      pos2.x + -Radius * Math.cos(angle),
      pos2.y + Radius * Math.sin(angle),
    ];
  }
  render() {
    // console.log("im rendering ConnectionLine" + this.props.props.lineProps.key.toString())
    // console.log(this.props)
    const { key, name, points } = this.props.lineProps;
    return (
      <Line
        key={key}
        name={name}
        points={points}
        stroke="black"
        fill="black"
      ></Line>
    );
  }
}
export default ConnectionLine;
// return (
//   <Line {...this.props.props.lineProps} stroke="black" fill="black"></Line>
// );
