import { CustomSessionType } from "../../types/CustomSessionType";
import convertHtmlStyleToCanvasStyle from "./convertHtmlStyleToCanvasStyle";
import getAxios from "./getAxios";
import getTextarea from "./getTextarea";
import * as Konva from "konva"
import { Canvas } from "konva/lib/Canvas";
import { CONNECTION, ER_DIAGRAM, ER_DIAGRAM_ROW_KEY, ER_DIAGRAM_ROW_VALUE, ER_DIAGRAM_TITLE, SIMPLE_TEXT, UPDATE } from "../constant";
import ChangeType from "../../types/ChangeType";
import { AppDispatch, RootState } from "../../store/store";
import ShapeNameType from "../../types/ShapeNameType";
import { addHistory } from "../../store/reducers/commonReducer";
import ShapeType from "../../types/ShapeType";
import { create } from "domain";
import { current } from "@reduxjs/toolkit";


export default function saveTextarea(state:RootState, dispatch:AppDispatch, stage: Konva.default.Stage | null | undefined) {
    const textarea = getTextarea()
    const session = state.users.session
    let currentShape = null;


    let newShape = null
    console.log("you are in saveTextarea")
    if (textarea !== null && stage !== null && stage !== undefined) {
        console.log("you found textarea")
        const canvasText:Konva.default.Text = stage.findOne(`#${textarea.getAttribute("id")}`)
        let canvasTransformer:(Konva.default.Transformer | null) = null
        switch(textarea.getAttribute("datatype")) {
            case SIMPLE_TEXT:
                const roomId = stage.attrs.id
                newShape = saveSimpleText(state,dispatch, textarea, session, canvasText, roomId)
                canvasTransformer = stage.findOne(`#${textarea.getAttribute("id")}-transformer`) as Konva.default.Transformer
                break;
            case ER_DIAGRAM:
                const canvasErDiagramGroup = getCanvasErDiagramGroup(canvasText)
                //const canvasErDiagramContainerGroup:Konva.default.Group = canvasErDiagramGroup.getParent() as any
                const erDiagramId = canvasErDiagramGroup.attrs.id
                newShape = saveErDiagram(state, dispatch, textarea, session, canvasText, erDiagramId)
                canvasTransformer = stage.findOne(`#${erDiagramId}-transformer`) as Konva.default.Transformer
                break;
            default:
                break;
        }

        textarea.style.visibility = "hidden"
        canvasText.show()
        canvasTransformer?.show()

        
    } else {
        console.log("you could not find textarea.")
    }
}


function getCanvasErDiagramGroup(canvasText:Konva.default.Text) {
    switch(canvasText.attrs.name) {
        case ER_DIAGRAM_ROW_KEY:
        case ER_DIAGRAM_ROW_VALUE:
            const canvasRowGroup = canvasText.parent as any
            return canvasRowGroup.parent
        case ER_DIAGRAM_TITLE:
            return canvasText.parent 
    }
}

async function saveSimpleText(state:RootState, dispatch:AppDispatch,textarea:HTMLTextAreaElement, session:CustomSessionType,
                             canvasText:Konva.default.Text, roomId:string) {
    try {        
        const newContent = textarea.value
        const newStyle = convertHtmlStyleToCanvasStyle(textarea)
        const axios = getAxios(session)
        const newSimpleText = {
            id: canvasText.attrs.id,
            roomId,
            x: canvasText.attrs.x,
            y: canvasText.attrs.y,
            width: canvasText.attrs.width,
            height: canvasText.attrs.height,
            scale: canvasText.scale(),
            rotation: canvasText.rotation(),
            style: newStyle,
            content: newContent,
            updatedBy: session?.id
        }
        const res = await axios.put(`/api/v1/simpleText/${canvasText.attrs.id}`, newSimpleText)
        return res.data
    } catch(err) {
        console.log(err)
    }
}

async function saveErDiagram(state:RootState,dispatch:AppDispatch, textarea:HTMLTextAreaElement, session:CustomSessionType, 
                            canvasText:Konva.default.Text, erDiagramId:string) {
    try {
        const newContent = textarea.value
        const newStyle = convertHtmlStyleToCanvasStyle(textarea)
        console.log(newStyle)
        const axios = getAxios(session)
        const body = {
            content: newContent,
            style: newStyle,
            updatedBy: session?.id
        }
        const currentShape = getCurrentShape(state, textarea.getAttribute("datatype") as ShapeNameType, textarea.getAttribute("id") as string)
        const res = await axios.put(`/api/v1/text/${erDiagramId}/${canvasText.attrs.id}`, body)
        console.log(res)
        return res.data
        
    } catch(err) {
        console.log(err)
    }
}

const getCurrentShape = (state:RootState, shapeName:ShapeNameType, id:string) => {
    switch (shapeName) {
        case ER_DIAGRAM:
            const erDiagram = state.erDiagrams.erDiagrams.find(erDiagram => erDiagram.id === id)
            return erDiagram ?? null
        case SIMPLE_TEXT:
            const simpleText = state.simpleTexts.simpleTexts.find(simpleText => simpleText.id === id)
            return simpleText ?? null
        case CONNECTION:
            const connection = state.connections.connections.find(connection => connection.id = id)
            return connection ?? null
        default:
            return null
    }
}