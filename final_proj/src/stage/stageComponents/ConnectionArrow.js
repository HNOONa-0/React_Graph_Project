import React, { PureComponent } from "react";
import { Arrow } from "react-konva";
import ConnectionLine from "./ConnectionLine";
let arrowKey = 0;

class ConnectionArrow extends PureComponent {
  static addArrow(from, to, pos1 = null, pos2 = null, shapesLayerRef) {
    return {
      arrowProps: {
        key: ++arrowKey,
        name: arrowKey.toString() + "arrow",
        points: ConnectionLine.moveConnection(from, to, pos1, pos2),
      },
      relatedNodes: { from, to },
    };
  }
  render() {
    // console.log("im rendering Connectionarrow" + this.props.props.arrowProps.key.toString())
    // console.log(this.props)
    const { key, name, points } = this.props.arrowProps;
    return (
      <Arrow
        key={key}
        name={name}
        points={points}
        stroke="black"
        fill="black"
      ></Arrow>
    );
  }
}
export default ConnectionArrow;
// return (
//   <Arrow
//     {...this.props.props.arrowProps}
//     stroke="black"
//     fill="black"
//   ></Arrow>
// );
