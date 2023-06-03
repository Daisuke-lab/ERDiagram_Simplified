
import { ConnectWithoutContactSharp } from '@mui/icons-material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NO_PERMISSION } from '../../src/constant'
import backendAxios from '../../src/helpers/getAxios'
import { RoomType, ErDiagramType, RowType, ConnectionOptionType,  TextStyleType,
ConnectionType, PermissionType} from '../../types'
import CanvasTextStyleType from '../../types/CanvasTextStyleType'
import ChangeType from '../../types/ChangeType'
import SimpleTextType from '../../types/SimpleTextType'







interface StateType {
    history: ChangeType[],
    historyStep: number,
    displayMenu: {
        display: boolean,
        x: number,
        y: number
    },
    enabledItems: string[],
    currentRoom: RoomType | null,
    currentPermission: PermissionType,
    rooms: RoomType[],
    currentSelection: ErDiagramType | ConnectionType | SimpleTextType | null,
    currentCanvasTextStyle: CanvasTextStyleType,
    draggingObjectId: null | string
}



const initialState:StateType = {
    history:[],
    historyStep: -1,
    displayMenu: {
        display: false,
        x: 0,
        y: 0
    },
    enabledItems: [],
    rooms:[],
    currentRoom: null,
    currentPermission: NO_PERMISSION,
    currentSelection: null,
    currentCanvasTextStyle: {
        fontFamily: "Caribri",
        fontSize: 10,
        fontWeight: "unset",
        fontStyle: "unset",
        textDecorationLine: "unset",
        color: "black",
        textAlign: "unset"  
    },
    draggingObjectId: null

}


export const commonSlice = createSlice({
    name: 'commons',
    initialState: initialState,
    reducers: {
      openMenu: (state, action) => {
          state.displayMenu = {...state.displayMenu, display: true, ...action.payload}
      },
      closeMenu: (state) => {
          state.displayMenu.display = false
          state.currentSelection = null
      },
      setEnabledItems: (state, action) => {
          state.enabledItems = action.payload
      },
      setCurrentRoom: (state, action) => {
        state.currentRoom = action.payload
      },

      increaseHistoryStep: (state) => {
          state.historyStep += 1
          const currentHistory = state.history[state.historyStep]
        //   state.tables = currentHistory.tables
        //   state.connections = currentHistory.connections
      },
      decreaseHistoryStep: (state) => {
        state.historyStep -= 1
        const currentHistory = state.history[state.historyStep]
        // state.tables = currentHistory.tables
        // state.connections = currentHistory.connections
    },
    addHistory: (state, action) => {
        state.history = [...state.history, action.payload]
        state.historyStep += 1
    },
    setRooms: (state, action) => {
        state.rooms = action.payload
    },
    updateRoom: (state, action) => {
        const roomIds = state.rooms.map(room => room.id)
        const index = roomIds.indexOf(action.payload.id)
        if (index !== -1) {
            const newRooms = [...state.rooms]
            newRooms.splice(index, 1, action.payload)
            state.rooms = newRooms
        } else {
            state.rooms = [...state.rooms, action.payload]
        }
        if (state.currentRoom !== null && action.payload.id === state.currentRoom.id) {
            state.currentRoom = action.payload
        }
        //const newRooms = state.rooms.filter(room => room.id !== action.payload.id)
    },

    setCurrentPermission: (state, action) => {
        state.currentPermission = action.payload
    },
    setCurrentCanvasTextStyle: (state, action) => {
        state.currentCanvasTextStyle = action.payload
    },
    setDraggingObjectId: (state, action) => {
        state.draggingObjectId = action.payload
    }

    },
    
  })
  
  // Action creators are generated for each case reducer function
  export const {openMenu, closeMenu, setEnabledItems, setCurrentRoom,
                increaseHistoryStep, decreaseHistoryStep, addHistory,
                setCurrentPermission, setRooms, updateRoom, setCurrentCanvasTextStyle,
                setDraggingObjectId} = commonSlice.actions
  
  export default commonSlice.reducer