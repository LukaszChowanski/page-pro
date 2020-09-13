import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import axios from 'axios'
import {
  getDataAction,
  deletePostAction,
  uploadDataAction,
  getData,
  deletePost,
  uploadData
} from '../actions'
import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  DELETE_POST,
  UPLOAD_DATA,
  API_REQUEST
} from '../actionTypes'
import { mockedUser, mockedPost, mockedComment } from '../../utils/testHelpers'
import { defaultState } from '../reducers'

jest.mock('axios')
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Action creators', () => {
  it('should create an action to get data - users', () => {
    const expectedAction = {
      type: FETCH_DATA_SUCCESS,
      payload: { data: [mockedUser], dataType: 'users' }
    }
    expect(getDataAction([mockedUser], 'users')).toEqual(expectedAction)
  })
  it('should create an action to get data - posts', () => {
    const expectedAction = {
      type: FETCH_DATA_SUCCESS,
      payload: { data: [mockedPost], dataType: 'posts' }
    }
    expect(getDataAction([mockedPost], 'posts')).toEqual(expectedAction)
  })
  it('should create an action to get data - comments', () => {
    const expectedAction = {
      type: FETCH_DATA_SUCCESS,
      payload: { data: [mockedComment], dataType: 'comments' }
    }
    expect(getDataAction([mockedComment], 'comments')).toEqual(expectedAction)
  })
  it('should create an action to delete post', () => {
    const postId = 1
    const expectedAction = {
      type: DELETE_POST,
      payload: postId
    }
    expect(deletePostAction(postId)).toEqual(expectedAction)
  })
  it('should create an action to upload data - posts', () => {
    const post = {
      userId: 1,
      title: 'sunt aut facere repellat provident',
      body: 'quia et suscipit\nsuscipit'
    }
    const expectedAction = {
      type: UPLOAD_DATA,
      payload: { dataType: 'posts', newData: post }
    }
    expect(uploadDataAction('posts', post)).toEqual(expectedAction)
  })
  it('should create an action to upload data - comments', () => {
    const comment = {
      id: 1,
      name: 'id labore ex et quam laborum',
      email: 'Eliseo@gardner.biz',
      body: 'laudantium enim quasi est quidem magnam voluptate'
    }
    const expectedAction = {
      type: UPLOAD_DATA,
      payload: { dataType: 'comments', newData: comment }
    }
    expect(uploadDataAction('comments', comment)).toEqual(expectedAction)
  })
})

describe('Actions', () => {
  it('creates FETCH_DATA_SUCCESS when fetching data has been done - users', () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: [mockedUser] })
    )
    const expectedActions = [
      { type: API_REQUEST },
      {
        type: FETCH_DATA_SUCCESS,
        payload: { data: [mockedUser], dataType: 'users' }
      }
    ]
    const store = mockStore(defaultState)
    return store.dispatch(getData('users')).then(() => {
      const actualActions = store.getActions()
      expect(actualActions).toEqual(expectedActions)
    })
  })
  it('creates FETCH_DATA_SUCCESS when fetching data has been done - posts', () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: [mockedPost] })
    )
    const expectedActions = [
      { type: API_REQUEST },
      {
        type: FETCH_DATA_SUCCESS,
        payload: { data: [mockedPost], dataType: 'posts' }
      }
    ]
    const store = mockStore(defaultState)
    return store.dispatch(getData('posts', '1')).then(() => {
      const actualActions = store.getActions().map(action => action)
      expect(actualActions).toEqual(expectedActions)
    })
  })
  it('creates FETCH_DATA_SUCCESS when fetching data has been done - comments', () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: [mockedComment] })
    )
    const expectedActions = [
      { type: API_REQUEST },
      {
        type: FETCH_DATA_SUCCESS,
        payload: { data: [mockedComment], dataType: 'comments' }
      }
    ]
    const store = mockStore(defaultState)
    return store.dispatch(getData('comments', '1')).then(() => {
      const actualActions = store.getActions()
      expect(actualActions).toEqual(expectedActions)
    })
  })
  it('creat FETCH_DATA_FAILURE if get error are occured', () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error('error')))
    const expectedAction = [
      { type: API_REQUEST },
      {
        type: FETCH_DATA_FAILURE,
        payload: 'Ups, we have some connection error'
      }
    ]
    const store = mockStore(defaultState)
    return store.dispatch(getData('users')).then(() => {
      const actualActions = store.getActions()
      expect(actualActions).toEqual(expectedAction)
    })
  })
  it('creates DELETE_POST when deleting post has been done', () => {
    axios.delete.mockImplementationOnce(() => Promise.resolve({}))
    const deletedPostId = 1
    const expectedActions = [
      { type: API_REQUEST },
      {
        type: DELETE_POST,
        payload: deletedPostId
      }
    ]
    const store = mockStore(defaultState)
    return store.dispatch(deletePost(deletedPostId)).then(() => {
      const actualActions = store.getActions()
      expect(actualActions).toEqual(expectedActions)
    })
  })
  it('creates UPLOAD_DATA when adding post has been done', () => {
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: mockedPost })
    )
    const newPost = {
      userId: mockedPost.userId,
      title: mockedPost.title,
      body: mockedPost.body
    }
    const expectedActions = [
      { type: API_REQUEST },
      {
        type: UPLOAD_DATA,
        payload: { dataType: 'posts', newData: mockedPost }
      }
    ]
    const store = mockStore(defaultState)
    return store.dispatch(uploadData('posts', newPost)).then(() => {
      const actualActions = store.getActions()
      expect(actualActions).toEqual(expectedActions)
    })
  })
  it('creates UPLOAD_DATA when adding post has been done', () => {
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: mockedComment })
    )
    const newComment = {
      postId: mockedComment.postId,
      name: mockedComment.name,
      email: mockedComment.email,
      body: mockedComment.body
    }
    const expectedActions = [
      { type: API_REQUEST },
      {
        type: UPLOAD_DATA,
        payload: { dataType: 'comments', newData: mockedComment }
      }
    ]
    const store = mockStore(defaultState)
    return store.dispatch(uploadData('comments', newComment)).then(() => {
      const actualActions = store.getActions()
      expect(actualActions).toEqual(expectedActions)
    })
  })
})
