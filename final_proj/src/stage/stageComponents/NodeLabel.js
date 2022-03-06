import Konva from "konva";
import React, { PureComponent } from "react";
import { Group } from "react-konva";
// import { Fill, FontSize, Radius } from "../../limits";
import { Fill, FontSize, Radius } from "../../myData/limits";
import MyRect from "./MyRect";
import MyText from "./MyText";

class NodeLabel extends PureComponent {
  static addLabel(t, pos, idx, c = 0, shapesLayerRef) {
    let text = new Konva.Text({
      fontSize: FontSize,
      fontFamily: "sans-serif",
      text: t,
    });
    shapesLayerRef.current.add(text);

    const newLabel = {
      groupProps: {
        key: idx,
        name: idx.toString() + "label",
        width: text.width(),
        height: FontSize,
        x: pos.x + Radius - text.width() / 2,
        y: pos.y + 2 * Radius,
      },
      rectProps: {
        name: idx.toString() + "labelRect",
        x: 0,
        y: 0,
        fill: Fill,
        opacity: 0.5,
        width: text.width(),
        height: FontSize,
      },
      textProps: {
        name: idx.toString() + "labelText",
        x: 0,
        y: 0,
        text: t,
        width: text.width(),
        height: text.height(),
        fontSize: FontSize,
        fontFamily: "sans-serif",
        align: "center",
      },
    };

    text.destroy();
    return newLabel;
  }
  render() {
    // console.log("im rendering NodeLabel" + this.props.props.groupProps.key.toString())
    // if (this.props.props.groupProps.id === 0) return null
    const shapeProps = this.props.shapeProps;
    const { groupProps, rectProps, textProps } = shapeProps;
    const { key, name, x, y, width, height } = groupProps;
    return (
      <Group key={key} name={name} x={x} y={y} width={width} height={height}>
        <MyRect rectProps={rectProps} />
        <MyText textProps={textProps} />
      </Group>
    );
  }
}
export default NodeLabel;
// return (
//   <Group {...this.props.props.groupProps}>
//     <Rect {...this.props.props.rectProps} />
//     <Text {...this.props.props.textProps} />
//   </Group>
// );
