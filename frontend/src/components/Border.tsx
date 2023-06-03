import React, { useEffect, useState } from 'react'
import { Stage, Layer, Rect, Text, Line } from "react-konva";
import { RootState, AppDispatch } from '../../store/store';
import { BOTTOM, DEFAULT_ER_DIAGRAM_ROW_HEIGHT, DEFAULT_ER_DIAGRAM_TITLE_HEIGHT, DEFAULT_ER_DIAGRAM_WIDTH, LEFT, RIGHT, TOP } from '../constant';
import { AnchorLocationType } from '../../types';
import { v4 as uuid } from 'uuid';
import { getRect } from '../helpers/transformHelper';

interface CoordinateType {
     x: number,
     y: number,
     width: number,
     height: number
}

interface Props {
    targetRef: React.RefObject<any>,
    state: RootState,
    dispatch: AppDispatch,
    id: string
}
function Border(props:Props) {
    const {targetRef, state, dispatch} = props
    //const absolutePosition = targetRef.current?.absolutePosition()
    const absolutePosition = {x:0,y:0}
    const erDiagram = state.erDiagrams.erDiagrams.find((erDiagram) => erDiagram.id === targetRef.current?.attrs.id)


    // the following code can't detect a change of length of rows
    //targetRef.current?.getClientRect({skipTransform:true, skipStroke:true}).height
    const erDiagramHeight = DEFAULT_ER_DIAGRAM_ROW_HEIGHT * (erDiagram?.rows.length ?? 0) + DEFAULT_ER_DIAGRAM_TITLE_HEIGHT

    const getX = (location:AnchorLocationType) => {
        switch(location) {
            case LEFT:
                return absolutePosition?.x
            case RIGHT:
                return absolutePosition?.x + DEFAULT_ER_DIAGRAM_WIDTH
            case TOP:
                return absolutePosition?.x
            case BOTTOM:
                return absolutePosition?.x  
            default:
                return 0
        }
    }

    const getY = (location:AnchorLocationType) => {
        switch(location) {
            case LEFT:
                return absolutePosition?.y
            case RIGHT:
                return absolutePosition?.y
            case TOP:
                return absolutePosition?.y
            case BOTTOM:
                return absolutePosition?.y + erDiagramHeight
            default:
                return 0
        }
    }
    
    // this will be scaled with ErDiagram, so the default width and height are specified.
    const getPoints = (location:AnchorLocationType) => {
        switch(location) {
            case LEFT:
                return [0,0,0, erDiagramHeight]
            case RIGHT:
                return [0,0,0, erDiagramHeight]
            case TOP:
                return [0,0,DEFAULT_ER_DIAGRAM_WIDTH,0]
            case BOTTOM:
                return [0,0,DEFAULT_ER_DIAGRAM_WIDTH,0]     
        }
    }

    const lineLocations:AnchorLocationType[] = [LEFT, RIGHT, TOP, BOTTOM]
    return (
        <>
        <Line
            key={`border-title-bottom-${erDiagram?.id ?? uuid()}`}
            x={getX("top")}
            y={getY("top") + DEFAULT_ER_DIAGRAM_TITLE_HEIGHT}
            points={getPoints("top")}
            stroke="black"
            strokeWidth={1}
            perfectDrawEnabled={false}
          />
        {lineLocations.map((lineLocation, index) => {
            //react can't detect key in konva, so it throws error """Each child in a list should have a unique "key" prop.""" but ignore it.
            return (
            <>
            <Line
            key={`border-${lineLocation}-${erDiagram?.id}`}
            x={getX(lineLocation)}
            y={getY(lineLocation)}
            dummy={erDiagram?.rows.length}
            points={getPoints(lineLocation)}
            stroke="black"
            strokeWidth={1}
            perfectDrawEnabled={false}
          />
          
          </>)
        })}
      </>
    )
}

export default Border