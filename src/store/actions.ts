import { Dispatch } from 'redux'
import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  DELETE_POST,
  UPLOAD_DATA,
  API_REQUEST
} from './actionTypes'
import { fetchData, postData, deleteData } from '../utils/helpers'
import {
  Actions,
  Data,
  FetchDataType,
  PostDataType,
  ThunkResult,
  DataToUpload
} from '../utils/declarations'

// error
const errorHandling = (error: any, dispatch: Dispatch<Actions>): void => {
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
export const getDataAction = (
  data: Data[],
  dataType: FetchDataType
): Actions => ({
  type: FETCH_DATA_SUCCESS,
  payload: { data, dataType }
})

export const getData = (
  dataType: FetchDataType,
  dataId = ''
): ThunkResult<void> => async (dispatch): Promise<void> => {
  dispatch({ type: API_REQUEST })
  try {
    const data = await fetchData(dataType, dataId)
    dispatch(getDataAction(data, dataType))
  } catch (error) {
    errorHandling(error, dispatch)
  }
}

// delete
export const deletePostAction = (postId: number): Actions => ({
  type: DELETE_POST,
  payload: postId
})

export const deletePost = (postId: number): ThunkResult<void> => async (
  dispatch
): Promise<void> => {
  dispatch({ type: API_REQUEST })
  try {
    await deleteData(postId)
    dispatch(deletePostAction(postId))
  } catch (error) {
    errorHandling(error, dispatch)
  }
}

// post
export const uploadDataAction = (
  dataType: PostDataType,
  newData: Data
): Actions => ({
  type: UPLOAD_DATA,
  payload: { dataType, newData }
})

export const uploadData = (
  dataType: PostDataType,
  data: DataToUpload
): ThunkResult<void> => async (dispatch): Promise<void> => {
  dispatch({ type: API_REQUEST })
  try {
    const newData = await postData(dataType, data)
    dispatch(uploadDataAction(dataType, newData))
  } catch (error) {
    errorHandling(error, dispatch)
  }
}
