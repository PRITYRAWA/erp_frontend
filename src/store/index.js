import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createReducer from '../reducers/index';
import baseState from './baseState';
// import { createLogger } from 'redux-logger';

export const history = createBrowserHistory();


// const loggerMiddleware = createLogger()

export default function configureStore() {
  /* The Root Reducer */
  const rootReducer = createReducer();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [
    routerMiddleware(history),
    thunkMiddleware,
    // loggerMiddleware
  ];

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  /* The Redux Store */
  const store = createStore(
    connectRouter(history)(rootReducer),
    baseState,
    enhancer
  );

  /* if (module.hot) {
     /* Enables Redux Hot Reloading 
     module.hot.accept('../reducers/index', () => {
       import('../reducers/index')
         .then((getReducer) => {
           store.replaceReducer(getReducer());
         });
     });
   }*/

  return store;
}