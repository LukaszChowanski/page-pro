import React from 'react'
import { screen } from '@testing-library/react'
import axios from 'axios'
import PageTemplate from './PageTemplate'
import { customRender } from '../../utils/testHelpers'

jest.mock('axios')
describe('PageTemplate fetch data from good endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('render with UserList route', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }))
    customRender(<PageTemplate>Home</PageTemplate>)
    screen.getByAltText(/Loading/i)
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users'
    )
    await screen.findByText(/home/i)
  })

  it('render with UserDetails route', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }))
    customRender(<PageTemplate>Home</PageTemplate>, {
      route: '/user/1',
      path: '/user/:userId'
    })
    expect(screen.getByAltText(/Loading/i)).toBeTruthy()
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts?userId=1'
    )
    await screen.findByText(/home/i)
  })
  it('render with PostDetails route', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} }))
    customRender(<PageTemplate>Home</PageTemplate>, {
      route: '/user/1/1',
      path: '/user/:userId/:postId'
    })
    screen.getByAltText(/Loading/i)
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/comments?postId=1'
    )
    await screen.findByText(/home/i)
  })
  it('render Error component when axios throw error', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error('something bad happened'))
    )
    customRender(<PageTemplate>Home</PageTemplate>)

    screen.getByAltText(/Loading/i)
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users'
    )
    await screen.findByText('Ups, we have some connection error')
  })
})
