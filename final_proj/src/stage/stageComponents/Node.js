import React, { PureComponent } from "react";
import { Group } from "react-konva";
// import { Fill, FontSize, FontType, Radius } from "../../limits";
import { Fill, FontSize, FontType, Radius } from "../../myData/limits";
import MyCircle from "./MyCircle";
import MyText from "./MyText";

class Node extends PureComponent {
  static addNode(pos, name, key, c = 0, shapesLayerRef) {
    return {
      groupProps: {
        key,
        name: key.toString() + "group",
        x: pos.x + c,
        y: pos.y + c,
        width: 2 * Radius,
        height: 2 * Radius,
        draggable: true,
      },
      circleProps: {
        name: key.toString() + "groupCircle",
        x: Radius,
        y: Radius,
        radius: Radius,
        fill: Fill,
        stroke: null,
      },
      textProps: {
        name: key.toString() + "groupText",
        x: 0,
        y: 0,
        width: 2 * Radius,
        height: 2 * Radius,
        text: name,
        align: "center",
        verticalAlign: "middle",
        fontFamily: FontType,
        fontSize: FontSize,
      },
    };
  }
  static getPosOfNodeCenter(key, shapesLayerRef) {
    const oldPos = shapesLayerRef.current
      .findOne("." + key.toString() + "group")
      .position();

    let newPos = { ...oldPos };
    newPos.x += Radius;
    newPos.y += Radius;

    return newPos;
  }
  render() {
    // if (this.props.props.groupProps.key == 0) return null
    // console.log("im rendering node" + this.props.props.groupProps.key.toString())
    const { shapeProps, dragBoundFunc, onDragMove, onDragEnd } = this.props;
    const { groupProps, circleProps, textProps } = shapeProps;
    const { key, name, x, y, width, height, draggable } = groupProps;
    return (
      <Group
        key={key}
        name={name}
        x={x}
        y={y}
        width={width}
        height={height}
        draggable={draggable}
        onDragMove={() => onDragMove(key)}
        dragBoundFunc={(pos) => dragBoundFunc(pos)}
        onDragEnd={(e) => onDragEnd(e, key)}
      >
        <MyCircle circleProps={circleProps} />
        <MyText textProps={textProps} />
      </Group>
    );
  }
}
export default Node;
// return (
//   <Group
//     // ref={this.ref}
//     // key={this.props.props.groupProps.key}
//     {...this.props.props.groupProps}
//     // onClick={(e) => {
//     //     // console.log(e.preventDefault())
//     //     this.props.onClick(e, this.props.props.groupProps.key)
//     // }}
//     onDragMove={() =>
//       this.props.onDragMove(this.props.props.groupProps.key)
//     }
//     // onDragEnd={() => this.props.onDragEnd(this.props.props.groupProps.key)}
//     // onContextMenu={() => this.props.onContextMenu(this.props.props.groupProps.key)}
//     // onDragStart={() => this.props.onDragStart(this.props.props.groupProps.key)}
//     dragBoundFunc={(pos) => this.props.dragBoundFunc(pos)}
//     onDragEnd={(e) =>
//       this.props.onDragEnd(e, this.props.props.groupProps.key)
//     }
//   >
//     <Circle
//       // key={this.props.props.circleProps.key}
//       {...this.props.props.circleProps}
//     ></Circle>
//     <Text
//       // key={this.props.props.textProps.key}
//       {...this.props.props.textProps}
//     ></Text>
//   </Group>
// );
