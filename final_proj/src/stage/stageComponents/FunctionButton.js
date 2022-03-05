import React, { memo } from 'react';
import { Html } from 'react-konva-utils';
const FunctionButton = React.forwardRef((props, ref) => {
    // console.log("rendering " + props.props.name)
    return (
        <Html groupProps={
            { x: props.props.x, y: props.props.y, key: props.props.key }
        }>
            <button
                onClick={() => props.props.onClick(props.props.key)}>{props.props.text}</button>
        </Html>
    )
})
export default memo(FunctionButton)
