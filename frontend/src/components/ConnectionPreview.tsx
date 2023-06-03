import React from 'react'
import { Stage, Layer, Rect, Text, Line } from "react-konva";
import {getEdgeR, getEdgeRotation, getRect} from '../helpers/transformHelper'
import { RootState, AppDispatch } from '../../store/store';
import {ErDiagramType, ConnectionType, PointConnectionType} from '../../types'
import * as Konva from "konva"

interface Props {
    dispatch: AppDispatch,
    state: RootState,
    stage: Konva.default.Stage | null
}
function ConnectionPreview(props:Props) {
    const {state, dispatch, stage} = props
    const connectionPreview = state.connections.connectionPreview as ConnectionType
    const destination = connectionPreview.destination as PointConnectionType
    const source = stage?.findOne(`#${connectionPreview?.source?.id}`)
    const {x, y, width, height} = getRect(source)


    const r = getEdgeR(connectionPreview.source.anchorLocation, width, height)
    const rotation = getEdgeRotation(connectionPreview.source.anchorLocation, width, r, source?.rotation() ?? 0)

    const radians = (Math.PI / 180) * rotation
    const cosTheta = Math.cos(radians)
    const sinTheta = Math.sin(radians)
    const lineX = x + cosTheta*r
    const lineY = y + sinTheta*r



    return (
    <>
    {connectionPreview !== null?
            <Line
            x={lineX}
            y={lineY}
            points={[0, 0,destination.x -lineX, 
                    destination.y - lineY] }
            stroke="black"
            strokeWidth={2}
        />:<></>
            }
    </>
  )
}



export default ConnectionPreview