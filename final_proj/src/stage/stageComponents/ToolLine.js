import React, { memo } from 'react';
import { Line } from 'react-konva';
const ToolLine = React.forwardRef((props, ref) => {
    // console.log("rendering " + props.props.name)
    return (
        <Line
            {...props.props}
            onClick={props.onClick}
            ref={ref}
        >
        </Line>
    )
})
export default memo(ToolLine);