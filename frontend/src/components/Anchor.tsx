import React, {useEffect, useState, useRef} from 'react'
import { Line, Circle } from "react-konva";
import * as Konva from "konva"
import { v4 as uuid } from 'uuid';
import {ConnectionOptionType, CustomSessionType} from '../../types'
import {getRect} from '../helpers/transformHelper'
import { RootState, AppDispatch } from '../../store/store';
import { useSession } from 'next-auth/react';
import getAxios from '../helpers/getAxios';
import ShapeConnectionType from '../../types/ShapeConnectionType';
import AnchorLocationType from '../../types/AnchorLocationType';
import ErDiagramType from '../../types/ErDiagramType';
import getAnchorPoint from '../helpers/getAnchorPoint';
import {mainTheme} from "../../themes/MainTheme"
import LocationType from '../../types/LocationType';
import { setConnectionPreview, setCurrentConnection } from '../../store/reducers/connectionReducer';

interface Props {
    state: RootState,
    dispatch: AppDispatch,
    targetRef: React.RefObject<Konva.default.Shape | Konva.default.Group>,
    location: AnchorLocationType
}

function Anchor(props:Props) {
    const {dispatch, state, targetRef,location} = props
    const [coordinates, setCoordinates] = useState<{x:number,y:number}>(getAnchorPoint(targetRef, location))

    //const [x,y] = getAnchorPoint(targetRef, location)
    const anchorRef = useRef<Konva.default.Circle>(null)
    const currentConnectionPreview = state.connections.connectionPreview
    const defaultConnectionOption = state.connections.defaultConnectionOption
    const [destination, setDestination] = useState<ShapeConnectionType | null>(null)
    const roomId = state.commons.currentRoom?.id
    const session = state.users.session
    const axios = getAxios(session as CustomSessionType | null)
    const [color, setColor] = useState<"black" | typeof mainTheme.secondary>("black")
    
    useEffect(() => {
      const {x, y} = getAnchorPoint(targetRef, location)
      const newCoordinates = {x,y}
      setCoordinates(newCoordinates)

    }, [targetRef.current?.attrs.x,  targetRef.current?.attrs.y])

  


    const dragBounds = () => {
        if (anchorRef.current !== null) {
          return anchorRef.current.getAbsolutePosition();
        }
        return {
          x: 0,
          y: 0,
        }
      }
    const scale = targetRef.current?.scale() ?? {x:1,y:1};









    const handleAnchorDragStart = (e:any) => {
        const position = e.target.position();
        const absolutePosition = targetRef.current?.absolutePosition()
        const connectionPreview = {
            source: {id: targetRef.current?.attrs.id, anchorLocation: location, connectionOption: defaultConnectionOption.source},
            destination: {x: position.x, y: position.y, connectionOption: defaultConnectionOption.destination
            }
        }
        dispatch(setConnectionPreview(connectionPreview))
    }
    const handleAnchorDragMove = (e:any) => {
        const position = e.target.position();
        const stage = e.target.getStage();
        const layer = e.target.getLayer();

        
        const pointerPosition = stage.getPointerPosition() as LocationType;
        detectCollision(layer, pointerPosition)
        const connectionPreview = {
            source: {
              id : targetRef.current?.attrs.id,
              anchorLocation: location,
              connectionOption: defaultConnectionOption.source},
            destination: {
              x:pointerPosition.x,
              y:pointerPosition.y,
              connectionOption: defaultConnectionOption.destination}
        }
        dispatch(setConnectionPreview(connectionPreview))
      }

    const handleAnchorDragEnd = async (e:any) => {
      const absolutePosition = targetRef.current?.absolutePosition()
      const stage = e.target.getStage();
      const pointerPosition = stage.getPointerPosition();
      const finalDestination = destination === null?{x:pointerPosition.x, y:pointerPosition.y, connectionOption: defaultConnectionOption.destination}
      :destination
      const connectionId = uuid()
      const connectionPreview = {
        ...currentConnectionPreview,
        source: {id: targetRef.current?.attrs.id, x: absolutePosition?.x, y: absolutePosition?.y, anchorLocation: location, connectionOption: defaultConnectionOption.source},
        destination:finalDestination,
        id: connectionId,
        roomId: roomId
        }
        try {
          const res = await axios.post("/api/v1/connection", connectionPreview)
          console.log(res)
          dispatch(setConnectionPreview(null))
          dispatch(setCurrentConnection(connectionPreview))
        } catch (err) {
          console.log(err)
        }
      }


      const detectCollision = (layer:Konva.default.Layer, target:LocationType) => {
        layer.find(`.connectable`).forEach(function (_shape) {
          const shape = _shape as Konva.default.Shape
          // do not check intersection with itself
          if (shape?.parent?.attrs.id === targetRef.current?.attrs.id) {
            return;
          }
          // && group.nodeType === "Group"
          if (haveIntersection(target, shape)) {
            //group.scale({x:2, y:2})
            const name = shape.attrs.name
            const location = name.includes("right")?"right":
                        name.includes("left")?"left":
                        name.includes("top")?"top":
                        "bottom"
            const sourceId = shape.attrs.id.replaceAll("anchor-", "")
            setDestination({id: sourceId, anchorLocation: location, connectionOption: defaultConnectionOption.destination})
            shape.fill(mainTheme.secondary);
          } else {
            if (shape.attrs.name.includes(destination?.anchorLocation) && shape.parent?.attrs.id === destination?.id) {
              setDestination(null)
            }
            shape.fill('black');
          }
        })
    }

    const haveIntersection = (currentPoint:LocationType, shape:Konva.default.Shape) => {
      if (typeof shape.attrs.width === "number" && typeof shape.attrs.height === "number") {
        return (
          currentPoint.x > shape.attrs.x &&
          currentPoint.x < shape.attrs.x + shape.attrs.width &&
          currentPoint.y > shape.attrs.y &&
          currentPoint.y < shape.attrs.y + shape.attrs.height
        );
      } else if (typeof shape.attrs.radius === "number") {
        const circleAbsolutePosition = shape.absolutePosition()
        return (
          currentPoint.x > circleAbsolutePosition.x - (shape.attrs.radius)&&
          currentPoint.x < circleAbsolutePosition.x + (shape.attrs.radius) &&
          currentPoint.y > circleAbsolutePosition.y - (shape.attrs.radius) &&
          currentPoint.y < circleAbsolutePosition.y + (shape.attrs.radius)
        )
      }else return false
    }

    
  return (
    <Circle
      x={coordinates.x}
      y={coordinates.y}
      radius={7}
      fill={color}
      draggable
      dragBoundFunc={() => dragBounds()}
      perfectDrawEnabled={false}
      ref={anchorRef}
      onDragStart={handleAnchorDragStart}
      onDragMove={handleAnchorDragMove}
      onDragEnd={handleAnchorDragEnd}
      onMouseEnter={() => setColor(mainTheme.secondary)}
      onMouseLeave={() => setColor("black")}
      name={`connectable ${location}`}
      id={`anchor-${targetRef.current?.attrs.id}`}
    />
  )
}

export default Anchor