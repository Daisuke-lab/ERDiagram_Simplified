import React, {useEffect, useState} from 'react'
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import dynamic from 'next/dynamic';
import { useAppSelector, useAppDispatch } from '../helpers/hooks'
import ERDiagram from './ERDiagram'
import CustomMenu from './CustomMenu';
import ConnectionPreview from './ConnectionPreview'
import Connection from './Connection'
import * as Konva from 'konva'
import SimpleText from './SimpleText';
import { openMenu, setEnabledItems } from '../../store/reducers/commonReducer';



function Conva() {
    const stageRef = React.useRef<Konva.default.Stage>(null)
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)
    const [stage, setStage] = useState<Konva.default.Stage | null>(null)
    const erDiagrams = useAppSelector(state => state.erDiagrams.erDiagrams)
    const display = useAppSelector(state => state.commons.displayMenu.display)
    const connections = useAppSelector(state => state.connections.connections)
    const connectionPreview = useAppSelector(state => state.connections.connectionPreview)
    const simpleTexts = useAppSelector(state => state.simpleTexts.simpleTexts)
    const currentRoom = useAppSelector(state => state.commons.currentRoom)
    const handleRightClick = (event:any) => {
      event?.preventDefault();
      if (!display) {
        dispatch(openMenu({x: event.clientX, y:event.clientY}))
        dispatch(setEnabledItems(["add-erDiagram", "delete-erDiagram", "add-simple-text", "delete-simple-text"]))
      }
    }
    useEffect(() => {
      setStage(stageRef.current)
    }, [])


    return (
      <div  onContextMenu={handleRightClick} id="canvas-container">
        <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef} id={currentRoom?.id}>
      <Layer>
      {connectionPreview !== null?
      <ConnectionPreview state={state} dispatch={dispatch} stage={stage}/>
      :<></>
      }
      {simpleTexts.map((simpleText, index) => (
        <SimpleText simpleText={simpleText} state={state} dispatch={dispatch} key={`simpleText-${simpleText.id}`}/>
      ))}
      {erDiagrams.map((erDiagram, index) => (
          <ERDiagram dispatch={dispatch} state={state} key={`er-diagram-${erDiagram.id}`} erDiagram={erDiagram}/>))}
        {stage !== null && connections.map((connection, index) => (
        <Connection connection={connection} dispatch={dispatch} state={state} key={`connection-${connection.id}`} 
        stage={stage}/>
      ))}
      </Layer>
    </Stage>
    <CustomMenu/>
    </div>
    )
}

export default Conva
