/* eslint-disable @typescript-eslint/member-delimiter-style */
import { Reducer } from 'redux'
import {
  FETCH_DATA_SUCCESS,
  DELETE_POST,
  UPLOAD_DATA,
  API_REQUEST,
  FETCH_DATA_FAILURE
} from './actionTypes'
import { Actions, State } from '../utils/declarations'

export const defaultState: State = {
  users: [],
  posts: [],
  comments: [],
  isLoaded: false,
  error: ''
}
// should be splited to smaller chunks using redux toolkit, and createSlice??
// or for appState and dataState??
export const reducer: Reducer<State, Actions> = (
  state = defaultState,
  action
): State => {
  switch (action.type) {
    case API_REQUEST:
      return {
        ...state,
        isLoaded: false,
        error: ''
      }
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        [action.payload.dataType]: action.payload.data,
        isLoaded: true
      }
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: action.payload
      }
    case UPLOAD_DATA:
      return {
        ...state,
        [action.payload.dataType]: [
          ...state[action.payload.dataType],
          action.payload.newData
        ],
        isLoaded: true
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(item => item.id !== action.payload),
        isLoaded: true
      }
    default:
      return state
  }
}
export type RootState = ReturnType<typeof reducer>
