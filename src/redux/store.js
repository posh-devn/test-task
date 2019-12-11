import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';

import { filterReducer, sortingReducer, ticketsReducer } from './reducers';

export default createStore(combineReducers({
  filter: filterReducer,
  sorting: sortingReducer,
  tickets: ticketsReducer,
}), compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
));
