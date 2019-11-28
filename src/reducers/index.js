import {combineReducers} from 'redux';
import sessions from './sessions';
import layout from './layout';
import client from './client';
import firm from './firm';

/**
 * 合并reducers
*/
const rootReducer = combineReducers({
  layout,
  firm,
  client,
  sessions
});

export default rootReducer;