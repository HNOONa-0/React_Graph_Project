import React, { memo } from 'react';
import { Arrow } from 'react-konva';
const ToolArrow = React.forwardRef((props, ref) => {
    // console.log("rendering " + props.props.name)
    return (
        <Arrow
            {...props.props}
            onClick={props.onClick}
            ref={ref}
        >
        </Arrow>
    )
})
export default memo(ToolArrow);