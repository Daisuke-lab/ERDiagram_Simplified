import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { Html } from 'react-konva-utils';
import styles from '../../styles/CanvasText.module.css'
import backendAxios from '../helpers/getAxios';
import { RootState, AppDispatch } from '../../store/store';
import * as Konva from "konva"
import { useSession } from 'next-auth/react';
import getAxios from '../helpers/getAxios';
import { CustomSessionType } from '../../types';
import { useAppSelector } from '../helpers/hooks';
import SimpleTextType from '../../types/SimpleTextType';
import { updateSimpleText } from '../../store/reducers/simpleTextReducer';
import convertHtmlStyleToCanvasStyle from '../helpers/convertHtmlStyleToCanvasStyle';
import saveTextarea from '../helpers/saveTextarea';
import { SIMPLE_TEXT } from '../constant';



interface Props {
    textRef: React.RefObject<Konva.default.Text>,
    state: RootState,
    dispatch: AppDispatch,
    textareaStyle: any

}
function SimpleTextHtmlText(props:Props) {

    const {state, dispatch, textRef,textareaStyle} = props
    const currentRoom = state.commons.currentRoom

    
    const scales = textareaStyle?.transform?.split(/\(|\)/) ??[]
    const session = state.users.session
    const axios = getAxios(session as unknown as CustomSessionType | null)
    const currentSimpleText = state.simpleTexts.currentSimpleText
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)



    const displayTextarea = () => {
        // avoid !undefined becoming true
        return !(textRef.current?.attrs.visible ?? true)
    }


    const onKeyDown = async (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
        console.log(e)
        const keyCode = e.keyCode;
        const key = e.key

        if (keyCode === 13 || key.valueOf === "Enter".valueOf) {
            console.log("you entered")
            saveTextarea(state, dispatch, textRef.current?.getStage())

        }
    }



    return (
        <Html
        divProps={
            {style:{
                transform: "none"
            }}
        }
          >
            {displayTextarea()?<textarea 
            defaultValue={textRef.current?.attrs.text}
            ref={textareaRef}
            id={textRef.current?.attrs.id}
            style={textareaStyle}
            datatype={SIMPLE_TEXT}
            onKeyDown={onKeyDown} 
            className={styles.canvasText}/>
            :<></>}
          </Html>
    )
}

export default SimpleTextHtmlText
