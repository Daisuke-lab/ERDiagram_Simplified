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
import { setCurrentRoom } from '../../store/reducers/commonReducer';
import saveTextarea from '../helpers/saveTextarea';
import { ER_DIAGRAM } from '../constant';




interface Props {
    textareaStyle: any,
    textRef: React.RefObject<Konva.default.Text>,
    dispatch: AppDispatch,
    state: RootState,
}
function ErDiagramTextHtmlText(props:Props) {

    const {dispatch, textareaStyle, state, textRef} = props
    

    const currentRoom = state.commons.currentRoom
    //const scales = text
    const session = state.users.session
    const axios = getAxios(session as unknown as CustomSessionType | null)
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const onKeyDown = async (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
        const keyCode = e.keyCode;
        if (keyCode === 13) {
            saveTextarea(state, dispatch, textRef.current?.getStage())

            try {
                const newRoom = {...currentRoom, previewImg: textRef.current?.getStage()?.toDataURL()}
                const res = await axios.put(`/api/v1/room/${currentRoom?.id}`, newRoom)
                console.log(res)
                dispatch(setCurrentRoom(newRoom))
              } catch (err) {
                console.log(err)
              }
        }
    }

    const displayTextarea = () => {
        // avoid !undefined becoming true
        return !(textRef.current?.attrs.visible ?? true)
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
            datatype={ER_DIAGRAM}
            onKeyDown={onKeyDown} 
            className={styles.canvasText}/>
            :<></>}
          </Html>
    )
}

export default ErDiagramTextHtmlText
