import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { loadState, saveState } from '../utils/localStorage'
import { reducer } from './reducers'

export default () => {
  const persistedState = loadState()

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    reducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
  )

  store.subscribe(() => {
    saveState(store.getState())
  })
  return store
}
