
import {createStore } from 'redux';
import rootReducer from './reducers';


export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);

  if(module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}