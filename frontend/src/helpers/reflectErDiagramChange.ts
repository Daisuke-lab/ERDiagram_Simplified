
import { deleteConnectionByErDiagramId } from '../../store/reducers/connectionReducer';
import { addErDiagram, deleteErDiagram, updateErDiagram } from '../../store/reducers/erDiagramReducer';
import { RootState, AppDispatch } from '../../store/store';
import {MessageType} from "../../types"
import ErDiagramType from '../../types/ErDiagramType';
import { CREATE, DELETE, UPDATE } from '../constant';
export default function reflectErDiagramChange(state:RootState, dispatch:AppDispatch, msg:MessageType<ErDiagramType>) {
    const erDiagram = msg.newData;
    const session = state.users.session


    switch(msg.method) {
        case CREATE:
            dispatch(addErDiagram(erDiagram))
            break
        case UPDATE:
            dispatch(updateErDiagram(erDiagram))
            break
        case DELETE:
            dispatch(deleteErDiagram(erDiagram))
            dispatch(deleteConnectionByErDiagramId(erDiagram.id))
            break
        default:
            return;
            
    }
    

}

