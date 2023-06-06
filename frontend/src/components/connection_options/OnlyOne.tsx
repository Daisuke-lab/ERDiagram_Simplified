import React from 'react'
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import Button from '@mui/material/Button';
import styles from '../../../styles/Connection.module.css'
import {optionStageWidth, optionStageHeight} from '../nav_bars/ConnectionTypeSelect'
import AnchorLocationType from '../../../types/AnchorLocationType';
interface Props{
  anchorLocation: AnchorLocationType,
  x: number,
  y:number
}


function OnlyOne(props:Props) {
  const {anchorLocation,x, y} = props
  const centerY = optionStageHeight/2

  const getFirstPoints = () => {
      switch(anchorLocation) {
        case "top":
            return [-5, -5, 5, -5]
        case "bottom":
            return [-5, 5, 5, 5]
        case "left":
            return [-5, 5, -5, -5]
        case "right":
            return [5, 5, 5, -5]
        default:
            return [0,0,0,0] 
      }
  }

  const getSecondPoints = () => {
      switch(anchorLocation) {
        case "top":
            return [-5, -10, 5, -10]
        case "bottom":
            return [-5, 10, 5, 10]
        case "left":
            return [-10, 5, -10, -5]
        case "right":
            return [10, 5, 10, -5]
        default:
            return [0,0,0,0]   
      }
  }
  return (
    <>
        <Line x={x} y={y} points={getFirstPoints()}
        stroke="black"
        strokeWidth={2}/>  
        <Line x={x} y={y} points={getSecondPoints()}
        stroke="black"
        strokeWidth={2}/>  
    </>
  )
}

export default OnlyOne