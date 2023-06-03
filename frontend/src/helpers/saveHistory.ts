import { AppDispatch, RootState } from "../../store/store";
import ChangeType from "../../types/ChangeType";
import MethodType from "../../types/MethodType";
import ShapeNameType from "../../types/ShapeNameType";
import ShapeType from "../../types/ShapeType";
import SimpleText from "../components/SimpleText";
import { CONNECTION, CREATE, DELETE, ER_DIAGRAM, SIMPLE_TEXT, UPDATE } from "../constant";


export default function saveHistory(state:RootState, shapeName:ShapeNameType, method:MethodType, id:string, newShape:ShapeType) {
    const change:ChangeType = {
        method,
        shapeName,
        from: null,
        to: newShape
    }

    switch(method) {
        case UPDATE:
            change.from = getCurrentShape(state, shapeName, id)
        case DELETE:
            change.from = null
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