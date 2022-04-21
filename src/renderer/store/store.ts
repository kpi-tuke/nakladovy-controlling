import {configureStore} from '@reduxjs/toolkit'
import {
  economicReducer,
  chainReducer,
  CVPReducer,
  paretoReducer,
  reportReducer,
  sortimentReducer,
  structureReducer,
  projectReducer
} from './slice'

export const store = configureStore({
  reducer: {
    economic: economicReducer,
    sortiment: sortimentReducer,
    chain: chainReducer,
    cvp: CVPReducer,
    structure: structureReducer,
    pareto: paretoReducer,
    report: reportReducer,
    project: projectReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
