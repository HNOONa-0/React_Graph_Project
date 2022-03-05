import React, { memo } from 'react';
import { Circle } from 'react-konva';
const ToolCircle = React.forwardRef((props, ref) => {
    // console.log("rendering " + props.props.name)
    return (
        <Circle
            {...props.props}
            onClick={props.onClick}
            ref={ref}
        >
        </Circle>
    )
})
export default memo(ToolCircle);