
import React, {useRef, useState, useEffect} from 'react'
import { Stage, Layer, Rect, Text, Line, Transformer } from "react-konva";
import { ConnectionType, PointConnectionType, AnchorLocationType } from '../../types';
import {getEdgeR, getEdgeRotation, getRect} from "../helpers/transformHelper"
import ConnectionOption from './ConnectionOption'
import { mainTheme } from '../../themes/MainTheme';
import { RootState, AppDispatch } from '../../store/store';
import * as Konva from "konva"
import { openMenu, setEnabledItems } from '../../store/reducers/commonReducer';
import { ShapeConnectionType } from '../../types/ShapeConnectionType';
import { setCurrentConnection } from '../../store/reducers/connectionReducer';
import { NodeConfig, Node } from 'konva/lib/Node';

interface Props {
    dispatch: AppDispatch,
    state: RootState,
    connection: ConnectionType,
    stage: Konva.default.Stage
}
export default function Connection(props:Props) {
    const {state, dispatch, connection, stage} = props
    const destinationId = (connection.destination as ShapeConnectionType)?.id
    const connectionRef = useRef<Konva.default.Line>(null)
    const source = stage.findOne(`#${connection.source.id}`)
    const destination = stage.findOne(`#${destinationId}`)



    const currentConnection = state.connections.currentConnection
    const display = state.commons.displayMenu.display

    const {x:sourceX, y:sourceY, width:sourceWidth, height:sourceHeight} = getRect(source)
    const sourceR = getEdgeR(connection.source?.anchorLocation, sourceWidth, sourceHeight)
    const sourceRotation = getEdgeRotation(connection.source?.anchorLocation, sourceWidth, sourceR, source?.rotation() ?? 0)
    const sourceRadians = (Math.PI / 180) * sourceRotation
    const sourceCosTheta = Math.cos(sourceRadians)
    const sourceSinTheta = Math.sin(sourceRadians)
    const startX = sourceX + sourceCosTheta*sourceR
    const startY = sourceY + sourceSinTheta*sourceR



    let endX = 0
    let endY = 0
    if (destination !== undefined) {
        const destObject = (connection.destination as ShapeConnectionType) 
        const {x:destX, y:destY, width:destWidth, height:destHeight} = getRect(destination)
        const destR = getEdgeR(destObject.anchorLocation, destWidth, destHeight)
        const destRotation = getEdgeRotation(destObject.anchorLocation, destWidth, destR, destination?.rotation() ?? 0)
        const destRadians = (Math.PI / 180) * destRotation
        const destCosTheta = Math.cos(destRadians)
        const destSinTheta = Math.sin(destRadians)
        endX = destX + destCosTheta*destR
        endY = destY + destSinTheta*destR
    } else {
        const destPoint = (connection.destination as PointConnectionType) 
        endX = destPoint.x
        endY = destPoint.y
    }

    const onLineClick = (event:any) => {
        if (currentConnection?.id !== connection.id) {
            dispatch(setCurrentConnection(connection))
        }


      }

    const handleRightClick = (event:any) => {
        //event?.preventDefault();
        if (!display) {
            dispatch(openMenu({x: event.target.attrs.points[0], y:event.target.attrs.points[1]}))
            dispatch(setEnabledItems(["delete-connection"]))
          }


    }

    //const point = avoidingCollisionPoint(connection.source.anchorLocation)

    const middlePoint = (location:AnchorLocationType | undefined) => {
        switch(location) {
            case "top":
                return [0, -20]
            case "right":
                return [20,0]
            case "bottom":
                return [0, 20]
            case "left":
                return [-20, 0]
            default:
                return [0, 0]
        }
    }


    const [sourceMiddleX, sourceMiddleY] = middlePoint(connection.source?.anchorLocation)
    const [destinationMiddleX, destinationMiddleY] = middlePoint((connection.destination as ShapeConnectionType)?.anchorLocation)
    const [points, setPoints] = useState<number[]>([startX, startY,
        startX + sourceMiddleX, startY + sourceMiddleY,
        startX + sourceMiddleX, endY + destinationMiddleY,
        endX + destinationMiddleX, endY + destinationMiddleY,
        endX, endY + destinationMiddleY,
        endX, endY])
    useEffect(() => {
        const newPoints = [startX, startY,
            startX + sourceMiddleX, startY + sourceMiddleY,
            startX + sourceMiddleX, endY + destinationMiddleY,
            endX + destinationMiddleX, endY + destinationMiddleY,
            endX, endY + destinationMiddleY,
            endX, endY]
        if (startY < endY) {
            newPoints.splice(4, 1, endX + destinationMiddleX)
            newPoints.splice(5, 1, startY + sourceMiddleY)
            newPoints.splice(6, 1, endX + destinationMiddleX)
            newPoints.splice(7, 1, endY + destinationMiddleY)
        }
        //setPoints(newPoints)
        if (source.isDragging() || (destination?.isDragging() ?? false)) {
            setPoints(newPoints)
        }
        
    }, [getRect(source),  display, endX, endY])
    //getRect(source),  display, endX, endY
    return (
    <>
    {currentConnection?.id === connection.id?
    <>
         <Line
         x={0}
         y={0}
         points={points}
         stroke={mainTheme.primary}
         lineCap='round'
         lineJoin='round'
         strokeWidth={7}
         tension={0}
         onClick={onLineClick}/>
         <Line
         x={0}
         y={0}
         points={points}
         stroke="white"
         lineCap='round'
         lineJoin='round'
         strokeWidth={5}
         onClick={onLineClick}/></>:
      <></>
        }

    <>
    <ConnectionOption anchorLocation={connection.source?.anchorLocation ?? "top"}
    connectionOption={connection.source?.connectionOption ?? "one"}
    x={startX}
    y={startY}
    />
            <Line
            id={connection.id}
            x={0}
            y={0}
            ref={connectionRef}
            points={points}
            stroke="black"
            lineCap='round'
            lineJoin='round'
            strokeWidth={2}
            tension={0}
            onClick={onLineClick}
            onContextMenu={handleRightClick}
        />
        <ConnectionOption anchorLocation={(connection.destination as ShapeConnectionType)?.anchorLocation ?? "top"}
            connectionOption={connection.destination?.connectionOption ?? "one"}
            x={endX}
            y={endY}
            />
    </>
    </>
  )
}
