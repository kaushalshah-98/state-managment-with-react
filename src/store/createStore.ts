import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import contactReducer from './contacts/reducer';

const rootReducer = combineReducers({
  contactReducer
});

export default function configureStore() {
  const composeEnhancers = compose; // add support for Redux dev tools

  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
