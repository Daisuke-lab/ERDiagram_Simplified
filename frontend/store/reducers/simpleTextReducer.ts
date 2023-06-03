import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import SimpleTextType from '../../types/SimpleTextType'


interface StateType {
    simpleTexts: SimpleTextType[],
    currentSimpleText: SimpleTextType | null,
}

const initialState:StateType = {
    simpleTexts: [],
    currentSimpleText: null,
}

export const simpleTextSlice = createSlice({
    name: 'simpleTexts',
    initialState: initialState,
    reducers: {
        setSimpleTexts: (state, action) => {
            state.simpleTexts = action.payload
        },
        setCurrentSimpleText: (state, action) => {
            state.currentSimpleText = action.payload
        },
        addSimpleText: (state, action) => {
            state.simpleTexts = [...state.simpleTexts, action.payload]
        },
        updateSimpleText: (state, action) => {
            const simpleTexts = state.simpleTexts.filter((simpleText) => simpleText.id !== action.payload.id)
            state.simpleTexts = [...simpleTexts, action.payload]
            if (state.currentSimpleText?.id === action.payload.id) {
                state.currentSimpleText = action.payload
            }
        },
        deleteSimpleText: (state, action) => {
            const simpleTexts = state.simpleTexts.filter((simpleText) => simpleText.id !== action.payload.id)
            state.simpleTexts = simpleTexts
        },
    }
})

export const {setSimpleTexts, setCurrentSimpleText, addSimpleText, updateSimpleText, deleteSimpleText} = simpleTextSlice.actions

export default simpleTextSlice.reducer