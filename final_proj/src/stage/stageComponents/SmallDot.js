import React, { memo } from 'react';
import { Circle } from 'react-konva';
const SmallDot = (props) => {
    // console.log("rendering small dot")
    return (
        <Circle
            {...props.props}
            onClick={props.onClick}
        />
    )
}
export default SmallDot;