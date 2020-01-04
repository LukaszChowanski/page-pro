import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  DELETE_POST,
  UPLOAD_DATA,
  API_REQUEST
} from './actionTypes'
import { fetchData, postData, deleteData } from './helpers'

// error
const errorHandling = (error, dispatch) => {
  const isError404 = error.response && error.response.status === 404

  if (isError404)
    dispatch({ type: FETCH_DATA_FAILURE, payload: 'Page not found' })
  else
    dispatch({
      type: FETCH_DATA_FAILURE,
      payload: 'Ups, we have some connection error'
    })
}

// fetch
const getDataAction = (data, dataType) => ({
  type: FETCH_DATA_SUCCESS,
  payload: { data, dataType }
})

export const getData = (dataType, dataId = '') => async dispatch => {
  dispatch({ type: API_REQUEST })
  try {
    const data = await fetchData(dataType, dataId)
    dispatch(getDataAction(data, dataType))
  } catch (error) {
    errorHandling(error, dispatch)
  }
}

// delete
const deletePostAction = post => ({
  type: DELETE_POST,
  payload: post
})

export const deletePost = postId => async dispatch => {
  dispatch({ type: API_REQUEST })
  try {
    await deleteData(postId)
    dispatch(deletePostAction(postId))
  } catch (error) {
    errorHandling(error, dispatch)
  }
}

// post
const uploadDataAction = (dataType, newData) => ({
  type: UPLOAD_DATA,
  payload: { dataType, newData }
})

export const uploadData = (dataType, data) => async dispatch => {
  dispatch({ type: API_REQUEST })
  try {
    const newData = await postData(dataType, data)
    dispatch(uploadDataAction(dataType, newData))
  } catch (error) {
    errorHandling(error, dispatch)
  }
}
