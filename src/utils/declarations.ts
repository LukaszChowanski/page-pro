/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import {
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    DELETE_POST,
    API_REQUEST,
    UPLOAD_DATA
} from '../store/actionTypes'

export type IUser = {
    id: number
    name: string
    phone: string
    email: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
}

export type IUploadPost = {
    userId: number
    title: string
    body: string
}
export type IPost = {
    id: number
} & IUploadPost

export type IUploadComment = {
    postId: number
    name: string
    email: string
    body: string
}
export type IComment = {
    id: number
} & IUploadComment

export type FetchDataType = 'users' | 'posts' | 'comments'
export type PostDataType = 'posts' | 'comments'

export type DataToUpload = IUploadPost | IUploadComment
export type Data = IUser | IPost | IComment

export interface ApiRequest {
    type: typeof API_REQUEST
}
export interface GetDataAction {
    type: typeof FETCH_DATA_SUCCESS
    payload: {
        data: Data[]
        dataType: FetchDataType
    }
}

export interface DeletePostAction {
    type: typeof DELETE_POST
    payload: number
}
export interface UploadDataAction {
    type: typeof UPLOAD_DATA
    payload: {
        dataType: PostDataType
        newData: Data
    }
}
export interface GetDataError {
    type: typeof FETCH_DATA_FAILURE
    payload: string
}
export type Actions =
    | GetDataAction
    | DeletePostAction
    | UploadDataAction
    | GetDataError
    | ApiRequest

export interface State {
    users: IUser[]
    posts: IPost[]
    comments: IComment[]
    isLoaded: boolean
    error: string
}
export type ThunkResult<R> = ThunkAction<R, State, void, Actions>
export type DispatchType = ThunkDispatch<State, void, Actions>