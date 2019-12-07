import {combineReducers} from 'redux';
import sessions from './sessions';
import layout from './layout';
import client from './client';
import firm from './firm';
import todo from './todo';
import order from './order';
import employee from './employee';

/**
 * 合并reducers
*/
const rootReducer = combineReducers({
  layout,
  firm,
  client,
  sessions,
  todo,
  order,
  employee
});

export default rootReducer;