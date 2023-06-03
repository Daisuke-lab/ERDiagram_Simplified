import { decreaseHistoryStep, increaseHistoryStep } from "../../store/reducers/commonReducer";
import { AppDispatch, RootState } from "../../store/store";
import { ShapeType } from "../../types";
import { CREATE, DELETE, UPDATE } from "../constant";
import getAxios from "./getAxios";


export default async function redo(state:RootState, dispatch:AppDispatch) {
    dispatch(increaseHistoryStep())
    const historyStep = state.commons.historyStep
    const history = state.commons.history
    const session = state.users.session
    const axios = getAxios(session)
    const change = history.at(historyStep + 1)
    console.log(historyStep)
    console.log({change})
    let res;

    try {
        switch(change?.method) {
            case DELETE:
                res = await axios.delete(`api/v1/${change.shapeName}/${change.from?.id}?redo=true`)
                break;
            case UPDATE:
                res = await axios.put(`api/v1/${change.shapeName}/${change.to?.id}?redo=true`, change.to)
                break;
            case CREATE:
                res = await axios.post(`api/v1/${change.shapeName}?redo=true`, change.to)
                break;
            default:
                console.log(`something went wrong. the method is ${change?.method}`)
        }
        console.log(res)
    } catch(err) {
        console.log(err)
    }
}