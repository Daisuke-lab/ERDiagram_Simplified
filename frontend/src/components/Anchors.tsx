import React from 'react'
import { AppDispatch, RootState } from '../../store/store'
import AnchorLocationType from '../../types/AnchorLocationType'
import ErDiagramType from '../../types/ErDiagramType'
import {TOP, LEFT, RIGHT, BOTTOM, ER_DIAGRAM, DEFAULT_ER_DIAGRAM_ROW_HEIGHT, ANCHOR_DISTANCE} from "../constant"
import Anchor from './Anchor'
import * as Konva from "konva"
import {getRotationofXY} from "../helpers/getAnchorPoint"
import getMarginalLinePoints from '../helpers/getMarginalLinePoints'
import { Stage, Layer, Rect, Text, Line, Transformer } from "react-konva";
import { getCenter, getRect } from '../helpers/transformHelper'

import { v4 as uuid } from 'uuid';

interface Props {
    state: RootState,
    dispatch: AppDispatch,
    targetRef: React.RefObject<Konva.default.Shape | Konva.default.Group>,
    hovered: boolean
}
function Anchors(props:Props) {
    const {state, dispatch, targetRef, hovered} = props
    const locations:AnchorLocationType[] = [TOP, LEFT, RIGHT, BOTTOM]
    const {width, height,x, y} = getRect(targetRef.current)

    //const x = targetRef.current?.attrs.x - ANCHOR_DISTANCE*2
    //const y = targetRef.current?.attrs.y - ANCHOR_DISTANCE*2


    const connectionPreview = state.connections.connectionPreview

    // const width = (targetRef.current?.attrs.width * targetRef.current?.attrs.scaleX)// + anchorDistance*4
    // let height = (targetRef.current?.attrs.height * targetRef.current?.attrs.scaleY)// + anchorDistance*4
    const widthWithMargin = width + ANCHOR_DISTANCE*4
    const heightWithMargin = height + ANCHOR_DISTANCE*4

    const rotation = getRotationofXY(targetRef?.current?.rotation() ??0, widthWithMargin, heightWithMargin)
    const {centerX, centerY} = getCenter(x,y,targetRef?.current?.rotation() ?? 0, width, height)
    const r = Math.sqrt((widthWithMargin/2)**2 + (heightWithMargin/2)**2)
    const radians = (Math.PI / 180) * (rotation)
    const cosTheta = Math.cos(radians)
    const sinTheta = Math.sin(radians)
    //x={centerX + r*sinTheta} y={centerY - r*cosTheta}
  return (
    <>
    <Rect x={centerX + r*sinTheta} y={centerY - r*cosTheta} width={widthWithMargin} height={heightWithMargin} 
       rotation={targetRef.current?.rotation()}/>
    {(hovered  || connectionPreview != null) && locations.map((location, index) => (
     <><Anchor location={location} key={`${targetRef.current?.attrs.id ?? uuid()}-anchor-${location}`}
     {...props}/>
     
     </>))}
     
    </>
  )
}

export default Anchors