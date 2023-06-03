import React from 'react'
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import AnchorLocationType from '../../../types/AnchorLocationType';

interface Props{
    anchorLocation: AnchorLocationType,
    x: number,
    y:number
  }


function Zero(props:Props) {
    const {anchorLocation,x, y} = props

    const getLocation = () => {
        switch(anchorLocation) {
            case "top":
                return [x,y - 15]
            case "bottom":
                return [x,y + 15]
            case "left":
                return [x-15,y]
            case "right":
                return [x+15,y]
            default:
                return [x,y]
        }
    }
    const [circleX, circleY] = getLocation()
  return (
    <Circle x={circleX} y={circleY} radius={5} strokeWidth={2} stroke="black" fill="white" zIndex={10}/>
  )
}

export default Zero