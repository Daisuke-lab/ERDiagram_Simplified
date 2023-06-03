import { addSimpleText, deleteSimpleText, updateSimpleText } from "../../store/reducers/simpleTextReducer";
import { AppDispatch, RootState } from "../../store/store";
import { ConnectionType, MessageType } from "../../types";
import { CREATE, DELETE, UPDATE } from "../constant";

export default function reflectSimpleTextChange(state:RootState, dispatch:AppDispatch, msg:MessageType<ConnectionType>) {
    const simpleText = msg.newData;



    switch(msg.method) {
        case CREATE:
            dispatch(addSimpleText(simpleText))
            break
        case UPDATE:
            dispatch(updateSimpleText(simpleText))
            break
        case DELETE:
            dispatch(deleteSimpleText(simpleText))
            break
        default:
            return;
            
    }
    

}