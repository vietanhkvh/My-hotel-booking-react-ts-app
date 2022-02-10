import { combineReducers } from 'redux';
import articleReducer from '../reducer/articleReducer'
import TestReducer from './testReducer';

// COMBINED REDUCERS
const reducers = {
  articles: articleReducer,
  tests: TestReducer
};

export default combineReducers(reducers);
// export type RootState = ReturnType<typeof reducers>;