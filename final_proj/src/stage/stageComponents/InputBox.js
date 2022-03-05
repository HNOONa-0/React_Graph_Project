import React, { memo } from 'react';
import { Html } from 'react-konva-utils';
const InputBox = React.forwardRef((props, ref) => {
    // console.log("rendering " + props.props.name)
    return (
        <Html groupProps={
            { x: props.props.x, y: props.props.y, key: props.props.key }
        }>
            <label>{props.props.text}</label>
            <input
                value={props.props.value}
                onChange={(e) => props.props.onChange(e, props.props.key)}
                onKeyDown={(e) => props.props.onKeyDown ? props.props.onKeyDown(e, props.props.key) : null}
                ref={props.props.key === 1 ? ref : null}
            />
        </Html>
    )
})
export default memo(InputBox)
