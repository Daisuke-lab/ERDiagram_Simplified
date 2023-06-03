import { AnyPtrRecord } from 'dns';
import React, {useRef, useEffect, useState} from 'react'
import { Stage, Layer, Shape, Transformer, Rect, Text, KonvaNodeComponent} from 'react-konva';;
import { Html } from 'react-konva-utils';
import ErDiagramHtmlText from './ErDiagramTextHtmlText'
import { TextType, RowType } from '../../types';
import { v4 as uuid } from 'uuid';
import * as Konva from "konva"
import { RootState, AppDispatch } from '../../store/store';
import ErDiagramType from '../../types/ErDiagramType';
import { CAN_EDIT, DEFAULT_ER_DIAGRAM_ROW_HEIGHT, DEFAULT_ER_DIAGRAM_WIDTH, DEFAULT_TEXTAREA_STYLE, ER_DIAGRAM_TITLE, OWNER, } from '../constant';
import convertCanvasStyleToHtmlStyle from '../helpers/convertCanvasStyleToHtmlStyle';
import extractCanvasStyleFromRef from '../helpers/extractCanvasStyleFromRef';
import { setCurrentCanvasTextStyle } from '../../store/reducers/commonReducer';
import ErDiagramTextFieldType from '../../types/ErDiagramTextFieldType';
import getTextarea from '../helpers/getTextarea';
import saveTextarea from '../helpers/saveTextarea';


interface Props {
    isSelected: boolean,
    transformable: boolean,
    text: TextType,
    dispatch: AppDispatch,
    field: ErDiagramTextFieldType
    state: RootState,
    x: number,
    y: number,
    erDiagramRef: React.RefObject<Konva.default.Group>,
    erDiagram: ErDiagramType
}

function ErDiagramText(props:Props) {
    const {text, dispatch, field, state, x, y,erDiagramRef, erDiagram} = props
    const currentPermission = state.commons.currentPermission
    const session = state.users.session
    const trRef = useRef<Konva.default.Transformer>(null)
    const textRef = useRef<Konva.default.Text>(null)
    const [textareaStyle, setTextareaStyle] = useState<any>({})
    const width = field === ER_DIAGRAM_TITLE ? DEFAULT_ER_DIAGRAM_WIDTH : DEFAULT_ER_DIAGRAM_WIDTH / 2




    const onClick = (e:any) => {
      if ([OWNER, CAN_EDIT].includes(currentPermission)) {
        switch (e.evt.detail) {
          case 1:
            //props.onSelect(e)
            break
          case 2:
            const textarea = getTextarea()
            if (textarea !== null) {
              saveTextarea(state, dispatch, textRef.current?.getStage())
            }
            textRef?.current?.hide()
            trRef?.current?.hide()
            const newTextareaStyle = {...DEFAULT_TEXTAREA_STYLE, ...convertCanvasStyleToHtmlStyle(textRef, erDiagramRef)}
            setTextareaStyle(newTextareaStyle)
            const newCurrentCanvasTextStyle = extractCanvasStyleFromRef(textRef)
            dispatch(setCurrentCanvasTextStyle(newCurrentCanvasTextStyle))
              break
        }
      }
      
    }



    return (
        <>
        <Text
        x={x}
        y={y}
        width={width}
        height={DEFAULT_ER_DIAGRAM_ROW_HEIGHT}
        onClick={onClick}
        ref={textRef}
        id={text.id}
        draggable={props.transformable}
        text={text.content}
        fontFamily={text.style?.fontFamily}
        fill={text.style?.color}
        fontStyle={`${text.style?.fontStyle} ${text.style?.fontWeight}`.replaceAll('unset', "")}
        fontSize={text.style?.fontSize ?? 10}
        textDecoration={text.style?.textDecorationLine}
        align={text.style?.textAlign}
        name={field}
      />
      <ErDiagramHtmlText
      textareaStyle={textareaStyle}
      dispatch={dispatch}
      state={state}
      textRef={textRef}
      />

          </>
    )
}

ErDiagramText.defaultProps = {
  transformable: false,
  stageRef: null,
  x: 0,
  y: 0
}

export default ErDiagramText
