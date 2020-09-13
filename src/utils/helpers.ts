import axios from 'axios'
import { Data, DataToUpload, FetchDataType, PostDataType } from './declarations'

const fetchUrl = {
  users: 'https://jsonplaceholder.typicode.com/users',
  posts: 'https://jsonplaceholder.typicode.com/posts?userId=',
  comments: 'https://jsonplaceholder.typicode.com/comments?postId='
}
const postUrl = {
  posts: 'https://jsonplaceholder.typicode.com/posts',
  comments: 'https://jsonplaceholder.typicode.com/comments'
}

export const fetchData = (
  dataType: FetchDataType,
  dataId = ''
): Promise<Data[]> =>
  // AxiosPromise<Data> ???
  // Promise<AxiosResponse<Data>> ???
  axios
    .get(`${fetchUrl[dataType]}${dataId}`)
    .then(({ data }) => data)
    .catch(error => {
      throw error
    })

export const postData = (
  dataType: PostDataType,
  newData: DataToUpload
): Promise<Data> =>
  // Promise<AxiosResponse<Data>> ???
  axios
    .post(`${postUrl[dataType]}`, newData)
    .then(({ data }) => data)
    .catch(error => {
      throw error
    })

export const deleteData = (postId: number): Promise<any> =>
  // Promise<AxiosResponse<any>> ???
  axios
    .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .catch(error => {
      throw error
    })
