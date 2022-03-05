import React, { PureComponent } from 'react';
import { Group, Text, Rect } from 'react-konva';
class WeightLabel extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        console.log("im rendering weightLabel" + this.props.props.textProps.key.toString())
        return (
            <Group {...this.props.props.groupProps}
                onClick={() => this.props.onClick(this.props.props.groupProps.key)}>
                <Rect {...this.props.props.rectProps}></Rect>
                <Text {...this.props.props.textProps}></Text>
            </Group>
        )
    }
}
export default WeightLabel;

