import { configureStore } from '@reduxjs/toolkit'
import { bilanceReducer, chainReducer, CVPReducer, paretoReducer, sortimentReducer, structureReducer } from './slice'

export const store = configureStore({
  reducer: {
    bilance: bilanceReducer,
    sortiment: sortimentReducer,
    chain: chainReducer,
    cvp: CVPReducer,
    structure: structureReducer,
    pareto: paretoReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
