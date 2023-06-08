import { addConnection, deleteConnection, updateConnection } from '../../store/reducers/connectionReducer';
import { RootState, AppDispatch } from '../../store/store';
import {MessageType, ConnectionType} from "../../types"
import { CREATE, DELETE, UPDATE } from '../constant';
export default function reflectConnectionChange(state:RootState, dispatch:AppDispatch, msg:MessageType<ConnectionType>) {
    const connection = msg.newData;
    const deletedConnection = msg.oldData
    const session = state.users.session



    switch(msg.method) {
        case CREATE:
            dispatch(addConnection(connection))
            break
        case UPDATE:
            dispatch(updateConnection(connection))
            break
        case DELETE:
            dispatch(deleteConnection(deletedConnection))
            break
        default:
            return;
            
    }
    

}