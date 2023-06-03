import React from 'react'
import {mainTheme} from "../../themes/MainTheme"
import {Line} from "react-konva"
import { DEFAULT_ER_DIAGRAM_ROW_HEIGHT, DEFAULT_ER_DIAGRAM_WIDTH } from '../constant'
interface Props {
    x: number,
    y:number,
}
function CurrentRowDecoration(props:Props) {
    const {x, y} = props
  return (
    <>
    <Line
        x={x}
        y={y}
        stroke={mainTheme.secondary}
        strokeWidth={1}
        tension={1}
        points={[0,0, DEFAULT_ER_DIAGRAM_WIDTH,0]}
        />

        <Line
        x={x}
        y={y + DEFAULT_ER_DIAGRAM_ROW_HEIGHT}
        stroke={mainTheme.secondary}
        strokeWidth={1}
        tension={1}
        points={[0,0, DEFAULT_ER_DIAGRAM_WIDTH, 0]}
        />

        <Line
        x={x}
        y={y}
        stroke={mainTheme.secondary}
        strokeWidth={1}
        tension={1}
        points={[0,0, 0, DEFAULT_ER_DIAGRAM_ROW_HEIGHT]}
        />
        <Line
        x={x + DEFAULT_ER_DIAGRAM_WIDTH}
        y={y}
        stroke={mainTheme.secondary}
        strokeWidth={1}
        tension={1}
        points={[0,0, 0, DEFAULT_ER_DIAGRAM_ROW_HEIGHT]}
        />
    </>
  )
}

export default CurrentRowDecoration