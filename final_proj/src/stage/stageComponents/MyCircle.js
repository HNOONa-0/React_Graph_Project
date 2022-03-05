import React, { PureComponent } from "react";
import { Circle } from "react-konva";
class MyCircle extends PureComponent {
  render() {
    const { name, x, y, radius, fill, stroke } = this.props.circleProps;
    return (
      <Circle
        name={name}
        x={x}
        y={y}
        radius={radius}
        fill={fill}
        stroke={stroke}
      />
    );
  }
}
export default MyCircle;
