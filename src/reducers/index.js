import {combineReducers} from 'redux';
import sessions from './sessions';
import layout from './layout';
import client from './client';

/**
 * 合并reducers
*/
const rootReducer = combineReducers({
  layout,
  client,
  sessions
});

export default rootReducer;