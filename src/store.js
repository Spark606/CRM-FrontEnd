import thunk from 'redux-thunk';
// import {createLogger} from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import apiMiddleware from './middlewares/callAPI';
import rootReducer from './reducers';


export default function configureStore(initialState) {
  // const logger = createLogger();
  const mid = applyMiddleware(thunk, apiMiddleware);
  // const mid = applyMiddleware(thunk, logger, apiMiddleware);
  const store = mid(createStore)(rootReducer, initialState);

  if(module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
