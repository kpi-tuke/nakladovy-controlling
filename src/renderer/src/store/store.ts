import { configureStore } from '@reduxjs/toolkit';
import { projectReducer } from './projectSlice';
import { CVPReducer } from '../pages/cvp/cvpSlice';
import { economicReducer } from '../pages/economic/economicSlice';
import { indexReducer } from '../pages/index/indexSlice';
import { paretoReducer } from '../pages/pareto/paretoSlice';
import { sortimentReducer } from '../pages/sortiment/sortimentSlice';
import { structureReducer } from '../pages/structure/structureSlice';
import { evaluationReducer } from '../pages/report/evaluationSlice';
import { CellValue, Header, Value } from './rootReducer';

export const store = configureStore({
  reducer: {
    economic: economicReducer,
    sortiment: sortimentReducer,
    index: indexReducer,
    cvp: CVPReducer,
    structure: structureReducer,
    pareto: paretoReducer,
    evaluation: evaluationReducer,
    project: projectReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type RootSelectors = {
  headers: (state: RootState) => Header[];
  selectHeaderByIndex: (index: number) => (state: RootState) => Header;
  selectValueByIndex: (index: number) => (state: RootState) => Value;
  data: (state: RootState) => CellValue[][];
  selectDataByPosition: (
    row: number,
    col: number,
  ) => (state: RootState) => CellValue;
  dynRows: (state: RootState) => boolean | undefined;
  dynCols: (state: RootState) => boolean | undefined;
  text: (state: RootState) => string;
  items: (state: RootState) => string[];
  corner: (state: RootState) => string;
  values: (state: RootState) => Value[];
  itemSelectOptions: (state: RootState) => any[];
};
