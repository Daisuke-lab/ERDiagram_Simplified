import { configureStore } from '@reduxjs/toolkit'
import commonReducer from './reducers/commonReducer'
import connectionReducer from './reducers/connectionReducer'
import simpleTextReducer from './reducers/simpleTextReducer'
import erDiagramReducer from './reducers/erDiagramReducer'
import userReducer from './reducers/userReducer'


const store =  configureStore({
  reducer: {
    commons: commonReducer,
    erDiagrams: erDiagramReducer,
    connections: connectionReducer,
    simpleTexts: simpleTextReducer,
    users: userReducer}
})
export default store
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch