import React, {useEffect, useState, useRef} from 'react';
import { Stage, Layer, Rect, Group, Text, Transformer, Line } from 'react-konva';
import { useAppSelector, useAppDispatch } from '../helpers/hooks'
import Row from './Row';
import ErDiagramText from './ErDiagramText'
import Border from './Border'
import backendAxios from '../helpers/getAxios';
import { RootState, AppDispatch } from '../../store/store';
import {CustomSessionType} from "../../types"
import { useSession } from 'next-auth/react';
import getAxios from '../helpers/getAxios';
import { CAN_EDIT, DEFAULT_ER_DIAGRAM_ROW_HEIGHT, DEFAULT_ER_DIAGRAM_TITLE_HEIGHT, DEFAULT_ER_DIAGRAM_WIDTH, ER_DIAGRAM, ER_DIAGRAM_TITLE, OWNER, UPDATE } from '../constant';
import Anchors from './Anchors';
import { SettingsInputAntenna } from '@mui/icons-material';
import { addHistory, openMenu, setCurrentRoom, setDraggingObjectId, setEnabledItems} from '../../store/reducers/commonReducer';
import {setCurrentErDiagram, updateErDiagram } from '../../store/reducers/erDiagramReducer';
import ErDiagramType from '../../types/ErDiagramType';





interface Props {
    dispatch: AppDispatch,
    state: RootState,
    erDiagram: ErDiagramType,
}
function ERDiagram(props:Props) {
    const {dispatch, state, erDiagram} = props;
    const historyStep = state.commons.historyStep
    const currentErDiagram = state.erDiagrams.currentErDiagram
    const currentPermission = state.commons.currentPermission
    const currentRoom = state.commons.currentRoom
    const canEdit = [CAN_EDIT, OWNER].includes(currentPermission)
    const [initialLocation, setInitialLocation] = useState<{x:number,y:number}>({x: erDiagram.x, y:erDiagram.y})
    const connectionPreview = state.connections.connectionPreview
    const trRef = useRef() as any
    const currentRow = state.erDiagrams.currentRow
    const erDiagramRef = useRef() as any
    const display = state.commons.displayMenu.display
    const session = state.users.session
    const axios = getAxios(session as unknown as CustomSessionType | null)
    const [hovered, setHovered] = useState<boolean>(false)
    const draggingObjectId = state.commons.draggingObjectId





    useEffect(() => {
      setInitialLocation({x: erDiagram.x, y:erDiagram.y})
    }, [historyStep])

    const handleRightClick = (event: any) => {
      const target = event.currentTarget
        if (!display && erDiagram.id === currentErDiagram?.id && currentRow === null) {
        dispatch(openMenu({x: target.attrs.x, y:target.attrs.y}))
        dispatch(setEnabledItems(["add-row", "copy", "delete-erDiagram"]))
        }

    }

    const onClick = (event:any) => {


        const tr = trRef?.current
        if (currentErDiagram?.id !== erDiagram.id) {
          dispatch(setCurrentErDiagram(erDiagram))
        }
        if (tr !== undefined && tr !== null && currentErDiagram === erDiagram) {
            tr.nodes([erDiagramRef?.current])
        }
    }

    useEffect(() => {
      const tr = trRef?.current
      if (tr !== undefined && tr !== null && erDiagram.id === currentErDiagram?.id) {
        tr.nodes([erDiagramRef?.current])
    }
    }, [erDiagram.rows.length, currentErDiagram])

    const handleCanvasChange = (e:any) => {
      const position = e.target.position();
      const stage = e.target.getStage();
      const newErDiagram = {
        ...erDiagram,
        x: position.x,
        y: position.y,
        scale: erDiagramRef.current.scale(),
        rotation: erDiagramRef.current.rotation()
      }
      if (erDiagram.id === currentErDiagram?.id && connectionPreview === null) {
        //dispatch(updateErDiagram(newErDiagram))
      }
      if (draggingObjectId !== erDiagram.id) {
        dispatch(setDraggingObjectId(erDiagram.id))
      }

      
      
    }


    const handleCanvasEnd = async (e:any) => {
      dispatch(setDraggingObjectId(null))
      const position = e.target.position();
      const newErDiagram = {
        ...erDiagram,
        x: position.x,
        y: position.y,
        scale: erDiagramRef.current.scale(),
        rotation: erDiagramRef.current.rotation()
      }

      try {
        const res = await axios.put(`/api/v1/erDiagram/${currentErDiagram?.id}`, newErDiagram)
        console.log(res)
      } catch(err) {
        console.log(err)
      }

      try {
        const newRoom = {...currentRoom, previewImg: erDiagramRef.current?.getStage().toDataURL()}
        const res = await axios.put(`/api/v1/room/${currentRoom?.id}`, newRoom)
        dispatch(setCurrentRoom(newRoom))
        console.log(res)
      } catch (err) {
        console.log(err)
      }
      
    }


  return (<>
  <Group
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}>
    <Anchors targetRef={erDiagramRef} state={state} dispatch={dispatch} hovered={hovered}/>
  <Group 
        draggable={erDiagram.id === currentErDiagram?.id && canEdit}
        onContextMenu={handleRightClick}
        onDragMove={handleCanvasChange}
        onDragEnd={handleCanvasEnd}
        onDragStart={() => dispatch(setDraggingObjectId(erDiagram.id))}
        ref={erDiagramRef}
        id={erDiagram.id}
        onTransform={handleCanvasChange}
        onTransformEnd={handleCanvasEnd}
        onClick={onClick}
        x={erDiagram.x}
        y={erDiagram.y}
        rotation={erDiagram.rotation}
        scale={erDiagram.scale}
        name={ER_DIAGRAM}
        >
          <Border targetRef={erDiagramRef} state={state} dispatch={dispatch} id={erDiagram.id}/>
        <ErDiagramText
        isSelected={currentErDiagram === erDiagram}
        text={erDiagram.title}
        field={ER_DIAGRAM_TITLE}
        dispatch={dispatch}
        state={state}
        erDiagramRef={erDiagramRef}
        erDiagram={erDiagram}
        />
      {[...erDiagram.rows].sort((a, b) => a.index - b.index).map((row, index:number) => (
          <Row index={index} dispatch={dispatch} state={state}
         erDiagramRef={erDiagramRef}
          erDiagram={erDiagram} key={`${erDiagram.id}-row-${index}`} row={row}/>
        ))}
        <Line
          x={0}
          y={DEFAULT_ER_DIAGRAM_ROW_HEIGHT*(erDiagram.rows.length) + 
          DEFAULT_ER_DIAGRAM_TITLE_HEIGHT}
          stroke="black"
          strokeWidth={1}
          tension={1}
          points={[0,0, DEFAULT_ER_DIAGRAM_WIDTH,0]}
          />
        </Group>
        
        
        </Group>
        {erDiagram.id === currentErDiagram?.id && canEdit?
        <>
        <Transformer
        ref={trRef}
        name={`${erDiagram.id}-transformer`}
        boundBoxFunc={(oldBox, newBox) => {
          // limit resize
          if (newBox.width < 5 || newBox.height < 5) {
            return oldBox;
          }
          return newBox;
        }}
      />
      </>:
      <></>
        }
        </>)
}

export default ERDiagram;
