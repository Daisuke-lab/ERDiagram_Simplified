
import React, { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Shape, Transformer, Rect, Text, KonvaNodeComponent, Group} from 'react-konva';
import * as Konva from "konva"
import { AppDispatch, RootState } from '../../store/store';
import SimpleTextType from '../../types/SimpleTextType';
import { CAN_EDIT, DEFAULT_TEXTAREA_STYLE, OWNER, SIMPLE_TEXT, UPDATE } from '../constant';
import { setCurrentSimpleText, updateSimpleText } from '../../store/reducers/simpleTextReducer';
import SimpleTextHtmlText from './SimpleTextHtmlText';
import { CustomSessionType } from '../../types';
import getAxios from '../helpers/getAxios';
import { addHistory, setCurrentCanvasTextStyle, setCurrentRoom } from '../../store/reducers/commonReducer';
import convertCanvasStyleToHtmlStyle from '../helpers/convertCanvasStyleToHtmlStyle';
import extractCanvasStyleFromRef from '../helpers/extractCanvasStyleFromRef';
import Anchors from './Anchors';
import getTextarea from '../helpers/getTextarea';
import saveTextarea from '../helpers/saveTextarea';
import { setDraggingObjectId } from '../../store/reducers/commonReducer';


interface Props {
    transformable: boolean,
    simpleText: SimpleTextType,
    dispatch: AppDispatch,
    state: RootState,
}


function SimpleText(props:Props) {
    const {transformable, simpleText, dispatch, state} = props
    const currentPermission = state.commons.currentPermission
    const trRef = useRef<Konva.default.Transformer>(null)
    const textRef = useRef<Konva.default.Text>(null)
    const currentSimpleText = state.simpleTexts.currentSimpleText
    const currentRoom = state.commons.currentRoom
    const isSelected = currentSimpleText?.id === simpleText.id
    const [textareaStyle, setTextareaStyle] = useState<any>({})
    const session = state.users.session
    const axios = getAxios(session as unknown as CustomSessionType | null)
    const [hovered, setHovered] = useState<boolean>(false)

    useEffect(() => {
        const tr = trRef?.current
        if (tr !== undefined && tr !== null && isSelected && textRef?.current !== null) {
          tr.nodes([textRef?.current])
      }
      }, [isSelected])
  


    const onClick = (e:any) => {
        if ([OWNER, CAN_EDIT].includes(currentPermission)) {
            switch (e.evt.detail) {
                case 1:
                    dispatch(setCurrentSimpleText(simpleText))
                    break
                case 2:
                    const textarea = getTextarea()
                    if (textarea !== null) {
                      saveTextarea(state, dispatch, textRef.current?.getStage())
                    }
                    textRef?.current?.hide()
                    trRef?.current?.hide()
                    const textareaStyle = {...DEFAULT_TEXTAREA_STYLE, ...convertCanvasStyleToHtmlStyle(textRef, textRef)}
                    const newCurrentCanvasTextStyle = extractCanvasStyleFromRef(textRef)
                    dispatch(setCurrentCanvasTextStyle(newCurrentCanvasTextStyle))
                    setTextareaStyle(textareaStyle)
                    break
          }
        }
        
      }

      const handleCanvasChange = (e:any) => {
        const position = e.target.position();
        const stage = e.target.getStage();
        // const newSimpleText = {
        //   ...simpleText,
        //   x: position.x,
        //   y: position.y,
        //   scale: textRef.current?.scale(),
        //   rotation: textRef.current?.rotation()
        // }
        // if (isSelected) {
        //   dispatch(setCurrentSimpleText(newSimpleText))
        // }
        
      }
  

      const handleCanvasEnd = async (e:any) => {
        dispatch(setDraggingObjectId(null))
        const position = e.target.position();
        const newSimpleText = {
          ...simpleText,
          x: position.x,
          y: position.y,
          scale: textRef.current?.scale(),
          rotation: textRef.current?.rotation()
        }
        try {

          const res = await axios.put(`/api/v1/simpleText/${simpleText?.id}`, newSimpleText)
          console.log(res)
        } catch(err) {
          console.log(err)
        }
  
        try {
          const newRoom = {...currentRoom, previewImg: textRef.current?.getStage()?.toDataURL()}
          const res = await axios.put(`/api/v1/room/${currentRoom?.id}`, newRoom)
          dispatch(setCurrentRoom(newRoom))
          console.log(res)
        } catch (err) {
          console.log(err)
        }
        
      }

  

  return (
    <>
    <Group
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}>
    <Anchors targetRef={textRef} state={state} dispatch={dispatch} hovered={hovered}/>
        <Text
        x={simpleText.x}
        y={simpleText.y}
        width={simpleText.width}
        height={simpleText.height}
        scale={simpleText.scale}
        rotation={simpleText.rotation}
        onClick={onClick}
        id={simpleText.id}
        ref={textRef}
        draggable={isSelected}
        text={simpleText.content}
        fontFamily={simpleText.style?.fontFamily}
        fill={simpleText.style?.color}
        fontStyle={`${simpleText.style?.fontStyle} ${simpleText.style?.fontWeight}`.replaceAll('unset', "")}
        fontSize={simpleText.style?.fontSize ?? 10}
        textDecoration={simpleText.style?.textDecorationLine}
        align={simpleText.style?.textAlign}
        visible={true}
        onDragMove={handleCanvasChange}
        onTransform={handleCanvasChange}
        onDragEnd={handleCanvasEnd}
        onDragStart={() => dispatch(setDraggingObjectId(simpleText.id))}
        onTransformEnd={handleCanvasEnd}
        name={SIMPLE_TEXT}
      />
      <SimpleTextHtmlText state={state} dispatch={dispatch} textRef={textRef} textareaStyle={textareaStyle} />
          {isSelected && props.transformable && [OWNER, CAN_EDIT].includes(currentPermission) && (
            <Transformer
              ref={trRef}
              id={`${simpleText.id}-transformer`}
              boundBoxFunc={(oldBox, newBox) => {
                // limit resize
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
          </Group>
          </>
  )
}
SimpleText.defaultProps = {
    transformable: true
  }

export default SimpleText