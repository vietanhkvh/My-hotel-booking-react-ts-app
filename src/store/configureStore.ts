import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import monitorReducersEnhancer from './enhancers/monitorReducer';
import loggerMiddleware from './middleware/logger';
import rootReducer from './reducer/rootReducer';

export function configureStore(preloadedState?: any) {
  const middlewares = [loggerMiddleware, thunkMiddleware];//option to add another middleware
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];////option to add another enhancers
  const composedEnhancers:any = composeWithDevTools(...enhancers);
  // if (process.env.NODE_ENV !== 'production' && module.hot) {
  //   module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  // }
  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}