import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import app from './reducers';
const middleware = [thunk];
const store = createStore(app, applyMiddleware(...middleware));
export default store;