import React from 'react'
import {
  screen,
  fireEvent,
  act,
  waitForElementToBeRemoved
} from '@testing-library/react'
import axios from 'axios'
import 'mutationobserver-shim'
import UserDetails from './UserDetails'
import { mockedPost, customRender, mockedUser } from '../../utils/testHelpers'
import { defaultState } from '../../store/reducers'

jest.mock('axios')

describe('UserDetails', () => {
  beforeEach(() => {
    axios.get.mockImplementation(() => Promise.resolve({ data: [mockedPost] }))
    customRender(<UserDetails match={{ params: { userId: 1 } }} />, {
      route: '/user/1',
      path: '/user/:userId',
      initialState: {
        ...defaultState,
        users: [mockedUser]
      }
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('show error message when api request was rejected', async () => {
    axios.get.mockImplementation(() => Promise.reject(new Error('fail')))

    customRender(<UserDetails match={{ params: { userId: 1 } }} />, {
      route: '/user/1',
      path: '/user/:userId',
      initialState: {
        ...defaultState,
        users: [mockedUser]
      }
    })

    await screen.findByText('Ups, we have some connection error')
  })
  it('should fetch data from correct endpoint', () => {
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(
      `https://jsonplaceholder.typicode.com/posts?userId=1`
    )
  })
  it('render component without crash', () => {
    // header elements
    screen.getByRole('heading', { name: `${mockedUser.name}` })
    screen.getByTestId('addPostIcon')
    screen.getByTestId('backButton')
    // post elements
    screen.getByText(mockedPost.title)
    screen.getByTestId('trash')
  })
  it('call axios.delete with right endpoint after click on trash icon', async () => {
    const succesfullDeleteMsg = 'Post deleted successfully'
    axios.delete.mockImplementation(() => Promise.resolve())

    fireEvent.click(screen.getByTestId('trash'))
    expect(axios.delete).toHaveBeenCalledTimes(1)
    expect(axios.delete).toHaveBeenCalledWith(
      `https://jsonplaceholder.typicode.com/posts/1`
    )

    screen.getByAltText('loading')
    await screen.findByText(succesfullDeleteMsg)
    await waitForElementToBeRemoved(() =>
      screen.queryByText(succesfullDeleteMsg)
    )
  })
  it('should render add post form after click on right icon', () => {
    const addPostButton = screen.getByTestId('addPostIcon')
    fireEvent.click(addPostButton)

    screen.getByRole('heading', { name: 'Add post' })
    screen.getByLabelText('Title')
    screen.getByLabelText('Body')
    screen.getByRole('button', { name: 'Save' })
    screen.getByRole('button', { name: 'Cancel' })
  })
  it('should add new Post', async () => {
    window.HTMLElement.prototype.scrollIntoView = function () { }

    const newPost = {
      body: 'some random body',
      title: 'some random title',
      userId: 1
    }
    const newPostToFetch = { ...newPost, ...{ id: 2 } }
    axios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: newPostToFetch
      })
    )

    const addPostButton = screen.getByTestId('addPostIcon')
    fireEvent.click(addPostButton)

    await act(async () => {
      fireEvent.input(screen.getByLabelText(/title/i), {
        target: {
          value: newPost.title
        }
      })
    })
    await act(async () => {
      fireEvent.input(screen.getByLabelText(/body/i), {
        target: {
          value: newPost.body
        }
      })
    })
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    })

    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toBeCalledWith(
      'https://jsonplaceholder.typicode.com/posts',
      newPost
    )
    // are form is closed
    expect(screen.queryByLabelText('Title')).not.toBeTruthy()
    // new post is added
    await screen.findByText(newPost.title)
  })
})
