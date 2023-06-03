import { RoomType, RowType, TextStyleType } from "../../types";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ErDiagramType from "../../types/ErDiagramType";

interface StateType {
    erDiagrams: ErDiagramType[],
    currentErDiagram: ErDiagramType | null,
    currentRow: RowType | null,
    editingField: {text: string, field:string, erDiagramIndex:number, rowIndex:number} | null,
    
}



const initialState:StateType = {
    erDiagrams: [],
    currentErDiagram: null,
    currentRow:  null,
    editingField: null

}

export const erDiagramSlice = createSlice({
    name: 'erDiagrams',
    initialState: initialState,
    reducers: {

      setErDiagrams: (state, action) => {
          state.erDiagrams = action.payload
      },

      addRow: (state, action) => {
          const newTables = state.erDiagrams.filter(table => table.id !== state.currentErDiagram?.id)
          if (state.currentErDiagram !== null) {
        
            var rows = [...state.currentErDiagram.rows, action.payload]
            rows = rows.sort((a, b) => a.index - b.index)
            state.currentErDiagram.rows = rows
            state.erDiagrams = [...newTables, state.currentErDiagram]
          }
      },
      deleteRow: (state) => {
        const newTables = state.erDiagrams.filter(table => table.id !== state.currentErDiagram?.id)
        if (state.currentErDiagram !== null && state.currentRow !== null) {
            var rows = state.currentErDiagram.rows.filter(row => row.id !== state.currentRow?.id)
            rows = rows.sort((a, b) => a.index - b.index)
          state.currentErDiagram.rows = rows
          state.erDiagrams = [...newTables, state.currentErDiagram]
          state.currentRow = null
        }
      },
      addErDiagram: (state, action) => {
          state.erDiagrams = [...state.erDiagrams, action.payload]
      },
      deleteErDiagram: (state, action) => {
          const deletingTable = action.payload
          state.erDiagrams = state.erDiagrams.filter((table) => table.id !== deletingTable?.id)
          state.currentErDiagram = null
      },
      setCurrentErDiagram: (state, action) => {
          if (state.currentErDiagram?.id !== action.payload.id) {
            state.currentRow = null
          }
          state.currentErDiagram = action.payload
          //state.disableContainerClick = false
      },
      setCurrentRow: (state, action) => {
          state.currentRow = action.payload
      },
      updateErDiagram:(state, action) => {
          const erDiagrams = state.erDiagrams.filter((erDiagram)=> erDiagram.id !== action.payload.id)
          state.erDiagrams = [...erDiagrams, action.payload]
          if (action.payload.id === state.currentErDiagram?.id) {
            state.currentErDiagram = action.payload
          }
      },
    
  }})
  
  // Action creators are generated for each case reducer function
  export const {addRow,addErDiagram, deleteErDiagram,
                setCurrentErDiagram, setCurrentRow, deleteRow,
                updateErDiagram, setErDiagrams} = erDiagramSlice.actions
  
  export default erDiagramSlice.reducer