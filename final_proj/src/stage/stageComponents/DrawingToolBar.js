
import React, { PureComponent } from 'react';
import { Rect } from 'react-konva';
class DrawingToolBar extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        // console.log("rendering toolbar")
        return (
            <React.Fragment>
                <Rect {...this.props.bigRectangle} />
                {this.props.smallRectangles.map((eachRect, i) => {
                    return <Rect {...eachRect} onClick={this.props.eventHandlers[i]} />
                })}
            </React.Fragment>
        )
    }
}
export default DrawingToolBar;
// import React, { memo } from 'react';
// import { Rect } from 'react-konva';
// const DrawingToolBar = (props) => {
//     console.log("drawing toolBar rendered")
//     let bigRectangle = {
//         width: props.props.length + props.props.padding,
//         height: (props.props.length + props.props.padding) * props.props.n,
//         x: props.props.x, y: props.props.y, stroke: "black"
//     }
//     let smallRectangles = []
//     for (let i = 0; i < props.props.n; i++) {
//         smallRectangles.push({
//             x: props.props.x, y: props.props.y + (props.props.length + props.props.padding) * i,
//             width: props.props.length + props.props.padding, stroke: "black",
//             height: props.props.length + props.props.padding, onClick: props.eventHandlers[i]
//         })
//     }
//     return (
//         <React.Fragment>
//             <Rect {...bigRectangle} />
//             {smallRectangles.map(eachRect => {
//                 return <Rect {...eachRect} />
//             })}
//         </React.Fragment>
//     )

// }
