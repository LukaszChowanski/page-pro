import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  DELETE_POST,
  UPLOAD_DATA,
  API_REQUEST
} from '../actionTypes'
import { mockedUser, mockedPost, mockedComment } from '../../utils/testHelpers'
import { defaultState, reducer } from '../reducers'

describe('Reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })
  it('should handle API_REQUEST', () => {
    const expectedState = {
      ...defaultState,
      isLoaded: false
    }
    expect(
      reducer({ ...defaultState, isLoaded: true }, { type: API_REQUEST })
    ).toEqual(expectedState)
  })
  it('should handle FETCH_DATA_SUCCESS', () => {
    const fetchUserAction = {
      type: FETCH_DATA_SUCCESS,
      payload: {
        dataType: 'users',
        data: [mockedUser]
      }
    }
    const fetchPostsAction = {
      type: FETCH_DATA_SUCCESS,
      payload: {
        dataType: 'posts',
        data: [mockedPost]
      }
    }
    const fetchCommentsAction = {
      type: FETCH_DATA_SUCCESS,
      payload: {
        dataType: 'comments',
        data: [mockedComment]
      }
    }

    expect(reducer(defaultState, fetchUserAction)).toEqual({
      ...defaultState,
      users: [mockedUser],
      isLoaded: true
    })
    expect(reducer(defaultState, fetchPostsAction)).toEqual({
      ...defaultState,
      posts: [mockedPost],
      isLoaded: true
    })
    expect(reducer(defaultState, fetchCommentsAction)).toEqual({
      ...defaultState,
      comments: [mockedComment],
      isLoaded: true
    })
  })
  it('should handle FETCH_DATA_FAILURE action', () => {
    const fetchDataFailureAction = {
      type: FETCH_DATA_FAILURE,
      payload: 'error'
    }
    expect(reducer(defaultState, fetchDataFailureAction)).toEqual({
      ...defaultState,
      isLoaded: true,
      error: 'error'
    })
  })
  it('should handle UPLOAD_DATA action', () => {
    const uploadPostsAction = {
      type: UPLOAD_DATA,
      payload: {
        dataType: 'posts',
        newData: mockedPost
      }
    }
    const uploadCommentsAction = {
      type: UPLOAD_DATA,
      payload: {
        dataType: 'comments',
        newData: mockedComment
      }
    }
    expect(reducer(defaultState, uploadPostsAction)).toEqual({
      ...defaultState,
      posts: [mockedPost],
      isLoaded: true
    })
    expect(reducer(defaultState, uploadCommentsAction)).toEqual({
      ...defaultState,
      comments: [mockedComment],
      isLoaded: true
    })
  })
  it('should handle DELETE_POST action', () => {
    const deleteAction = {
      type: DELETE_POST,
      payload: mockedPost.id
    }
    const state = {
      ...defaultState,
      posts: [mockedPost]
    }
    expect(reducer(state, deleteAction)).toEqual({
      ...defaultState,
      isLoaded: true
    })
  })
})
