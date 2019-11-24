import {combineReducers} from 'redux';
import sessions from './sessions';
import layout from './layout';

/**
 * 合并reducers
*/
const rootReducer = combineReducers({
  layout,
  sessions
});

export default rootReducer;