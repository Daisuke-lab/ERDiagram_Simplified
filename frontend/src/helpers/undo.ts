
import { decreaseHistoryStep } from "../../store/reducers/commonReducer";
import { AppDispatch, RootState } from "../../store/store";
import { ShapeType } from "../../types";
import { CREATE, DELETE, UPDATE } from "../constant";
import getAxios from "./getAxios";


export default async function undo(state:RootState, dispatch:AppDispatch) {
    
    const historyStep = state.commons.historyStep
    const history = state.commons.history
    const session = state.users.session
    const axios = getAxios(session)
    const change = history.at(historyStep)
    let res;
    try {
        switch(change?.method) {
            case DELETE:
                res = await axios.post(`api/v1/${change.shapeName}?undo=true`, change.from)
                break;
            case UPDATE:
                res = await axios.put(`api/v1/${change.shapeName}/${change.from?.id}?undo=true`, change.from)
                break;
            case CREATE:
                res = await axios.delete(`api/v1/${change.shapeName}/${change.to?.id}?undo=true`)
                break;
            default:
                console.log(`something went wrong. the method is ${change?.method}`)
        }
        console.log(res)
        dispatch(decreaseHistoryStep())
    } catch(err) {
        console.log(err)
    }
    

}