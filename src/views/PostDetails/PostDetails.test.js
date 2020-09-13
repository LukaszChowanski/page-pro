import React from 'react'
import { screen, fireEvent, act } from '@testing-library/react'
import axios from 'axios'
import 'mutationobserver-shim'
import PostDetails from './PostDetails'
import {
  mockedPost,
  customRender,
  mockedUser,
  mockedComment
} from '../../utils/testHelpers'
import { defaultState } from '../../store/reducers'

jest.mock('axios')

describe('PostDetails', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  beforeEach(() => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: [mockedComment] })
    )
    customRender(<PostDetails match={{ params: { userId: 1, postId: 1 } }} />, {
      route: '/user/1/1',
      path: '/user/:userId/:postId',
      initialState: {
        ...defaultState,
        users: [mockedUser],
        posts: [mockedPost]
      }
    })
  })
  it('should fetch comments from correct endpoint', () => {
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/comments?postId=1'
    )
  })
  it('should show error message when api request was rejected', async () => {
    axios.get.mockImplementation(() => Promise.reject(new Error('fail')))

    customRender(<PostDetails match={{ params: { userId: 1, postId: 1 } }} />, {
      route: '/user/1/1',
      path: '/user/:userId/:postId',
      initialState: {
        ...defaultState,
        users: [mockedUser],
        posts: [mockedPost]
      }
    })

    await screen.findByText('Ups, we have some connection error')
  })
  it('should render with correct data', () => {
    screen.getByRole('heading', { name: `${mockedUser.name}` })
    expect(screen.queryByTestId('addPostIcon')).not.toBeTruthy()
    screen.getByTestId('backButton')
    screen.getByText(mockedPost.title)
    screen.getByText(new RegExp(mockedPost.body.slice(0, 10), 'i'))
    screen.getByRole('button', { name: 'Show Comments' })
    // comment section hiden at the begining
    expect(screen.queryByText(mockedComment.name)).not.toBeTruthy()
  })
  it('should show/hide comment section', () => {
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Show Comments'
      })
    )
    screen.getByRole('button', { name: 'Add comment' })
    screen.getByText(mockedComment.name)
    screen.getByText(mockedComment.email)
    screen.getByText(new RegExp(mockedComment.body.slice(0, 10), 'i'))

    fireEvent.click(screen.getByRole('button', { name: 'Hide comments' }))
    expect(
      screen.queryByRole('button', { name: 'Hide comments' })
    ).not.toBeTruthy()
    expect(screen.queryByText(mockedComment.name)).not.toBeTruthy()
  })
  it('should show form', () => {
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Show Comments'
      })
    )
    const addCommentButton = screen.getByRole('button', { name: 'Add comment' })
    expect(addCommentButton).toBeTruthy()
    fireEvent.click(addCommentButton)

    screen.getByRole('heading', { name: 'Add comment' })
    screen.getByLabelText('Name')
    screen.getByLabelText('E-mail')
    screen.getByLabelText('Body')
    screen.getByRole('button', { name: 'Save' })
    screen.getByRole('button', { name: 'Cancel' })
  })
  it('should add new comment and close add comment window', async () => {
    window.HTMLElement.prototype.scrollIntoView = function () { }
    const newComment = {
      name: 'TestName',
      email: 'testemail@emil.com',
      body: 'testBody',
      postId: 1
    }
    const newCommentToFetch = { ...newComment, ...{ id: 2 } }

    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: newCommentToFetch
      })
    )
    // show form
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Show Comments'
      })
    )
    fireEvent.click(screen.getByRole('button', { name: 'Add comment' }))
    // adding comment
    fireEvent.input(screen.getByLabelText(/name/i), {
      target: {
        value: newComment.name
      }
    })
    fireEvent.input(screen.getByLabelText(/E-mail/i), {
      target: {
        value: newComment.email
      }
    })
    fireEvent.input(screen.getByLabelText(/body/i), {
      target: {
        value: newComment.body
      }
    })
    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: 'Save' }))
    })

    expect(axios.post).toBeCalledTimes(1)
    expect(axios.post).toBeCalledWith(
      'https://jsonplaceholder.typicode.com/comments',
      newComment
    )
    // form should not be visible anymore
    expect(screen.queryByLabelText('Name')).not.toBeTruthy()
    // new comment is added
    await screen.findByText(newComment.name)
    screen.getByText(newComment.email)
    screen.getByText(new RegExp(newComment.body, 'i'))
  })
})
