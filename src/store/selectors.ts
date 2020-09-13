import { createSelector } from 'reselect'
import { RootState } from './reducers'
import { IUser, IPost, IComment } from '../utils/declarations'

export const getUsers = (state: RootState): IUser[] => {
  return state.users
}
export const getUserName = createSelector(
  [getUsers, (_: RootState, id: string): string => id],
  (users, id) => {
    const userId = Number(id)
    const user = users.find(item => item.id === userId)
    if (user === undefined) return ''
    return user.name
  }
)

export const getPosts = (state: RootState): IPost[] => {
  return state.posts
}
export const getPostTitle = createSelector(
  [getPosts, (_: RootState, id: string): string => id],
  (posts, id) => {
    const postId = Number(id)
    const post = posts.find(item => item.id === postId)
    if (post === undefined) return ''
    return post.title
  }
)

export const getPostBody = createSelector(
  [getPosts, (_: RootState, id: string): string => id],
  (posts, id) => {
    const postId = Number(id)
    const post = posts.find(item => item.id === postId)
    if (post === undefined) return ''
    return post.body
  }
)

export const getComments = (state: RootState): IComment[] => {
  return state.comments
}
