import axios from 'axios'

const fetchUrl = {
  users: 'https://jsonplaceholder.typicode.com/users',
  posts: 'https://jsonplaceholder.typicode.com/posts?userId=',
  comments: 'https://jsonplaceholder.typicode.com/comments?postId='
}
const postUrl = {
  posts: 'https://jsonplaceholder.typicode.com/posts',
  comments: 'https://jsonplaceholder.typicode.com/comments'
}

export const fetchData = (dataType, dataId = '') =>
  axios
    .get(`${fetchUrl[dataType]}${dataId}`)
    .then(({ data }) => data)
    .catch(error => {
      throw error
    })

export const postData = (dataType, newData) =>
  axios
    .post(`${postUrl[dataType]}`, newData)
    .then(({ data }) => data)
    .catch(error => {
      throw error
    })

export const deleteData = postId =>
  axios
    .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .catch(error => {
      throw error
    })
