
import { ConnectWithoutContactSharp } from '@mui/icons-material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NO_PERMISSION } from '../../src/constant'
import backendAxios from '../../src/helpers/getAxios'
import { RoomType,  RowType, ConnectionOptionType,  TextStyleType,
ConnectionType, PermissionType} from '../../types'
import ShapeConnectionType from '../../types/ShapeConnectionType'
import ErDiagramType from '../../types/ErDiagramType'







interface StateType {

    connections: ConnectionType[],
    currentConnection: ConnectionType | null,
    connectionPreview: ConnectionType | null,
    defaultConnectionOption: {
        source: ConnectionOptionType,
        destination: ConnectionOptionType
    },
}



const initialState:StateType = {
    currentConnection: null,
    connectionPreview: null,
    connections: [],
    defaultConnectionOption: {
        source: "normal",
        destination: "normal"
    },
}


export const connectionSlice = createSlice({
    name: 'connections',
    initialState: initialState,
    reducers: {
      setConnections: (state, action) => {
          state.connections = action.payload
      },

      setCurrentConnection: (state, action) => {
          state.currentConnection = action.payload
      },
      deleteConnection: (state, action) => {
          const newConnections = state.connections.filter((connection) => connection.id !== action.payload.id)
          state.connections = [...newConnections]
          if (action.payload.id === state.currentConnection?.id) {
            state.currentConnection = null
          }
      },
      setConnectionPreview: (state, action) => {
          state.connectionPreview = action.payload
      },
      addConnection: (state, action) => {
          state.connections = [...state.connections, action.payload]
      },
      setDefaultConnectionOption: (state, action) => {
          state.defaultConnectionOption = action.payload
      },
      updateConnection: (state, action) => {
          const otherConnections = state.connections.filter(connection => connection.id !== action.payload.id)
          state.connections = [...otherConnections, action.payload]
          if (state.currentConnection?.id === action.payload.id) {
            state.currentConnection = action.payload
          }
      },
      deleteConnectionByErDiagramId: (state, action) => {
        const erDiagramId = action.payload
        const newConnections = state.connections.filter(connection => connection.source.id !== erDiagramId && (connection.destination as ShapeConnectionType)?.id !== erDiagramId)
        state.connections = newConnections
      }
    
  }})
  
  // Action creators are generated for each case reducer function
  export const {setConnectionPreview, addConnection, deleteConnectionByErDiagramId,
                setCurrentConnection, deleteConnection,
                setDefaultConnectionOption, updateConnection, setConnections} = connectionSlice.actions
  
  export default connectionSlice.reducer