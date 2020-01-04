import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import {
  FETCH_DATA_SUCCESS,
  DELETE_POST,
  UPLOAD_DATA,
  API_REQUEST,
  FETCH_DATA_FAILURE
} from './actionTypes'
import { loadState, saveState } from './localStorage'

const deafultState = {
  users: [],
  posts: [],
  comments: [],
  isLoaded: false,
  error: ''
}

const dataReducer = (state = deafultState, action) => {
  const { type, payload } = action
  switch (type) {
    case API_REQUEST:
      return {
        ...state,
        isLoaded: false,
        error: ''
      }
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        [payload.dataType]: payload.data,
        isLoaded: true
      }
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        error: payload
      }
    case UPLOAD_DATA:
      return {
        ...state,
        [payload.dataType]: [...state[payload.dataType], payload.newData],
        isLoaded: true
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(item => item.id !== payload),
        isLoaded: true
      }
    default:
      return state
  }
}

const persistedState = loadState()

const reducer = combineReducers({
  data: dataReducer,
  form: formReducer
})
const store = createStore(
  reducer,
  persistedState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
)

store.subscribe(() => {
  saveState(store.getState())
})

export { store }
