import React from 'react'
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import styles from '../../../styles/Connection.module.css'
import {optionStageWidth, optionStageHeight} from '../nav_bars/ConnectionTypeSelect'
interface Props{
    direction: "source" | "destination"
}
function ZeroOrOne(props:Props) {
  const {direction} = props
  const firstInitialX = direction==="source"?13:23
  const secondInitialX = direction==="source"?firstInitialX-5:firstInitialX+5
  const circleX = direction==="source"?optionStageWidth/2 - 3:optionStageWidth/2
  const centerY = optionStageHeight/2
  return (
    <div className={styles.stageContainer}>
    <Stage width={40} height={30}>
        <Layer>
            <Line x={3} y={centerY} points={[0,0,30,0]}
            stroke="black"
            strokeWidth={2}/>
            <Line x={secondInitialX} y={centerY} points={[0,-5,0,5]}
            stroke="black"
            strokeWidth={2}/>
            <Circle x={circleX} y={centerY} radius={5} strokeWidth={2} stroke="black" fill="white"/>
        </Layer>
    </Stage>
    </div>
  )
}

export default ZeroOrOne