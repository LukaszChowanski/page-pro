import React from 'react'
import { screen } from '@testing-library/react'
import axios from 'axios'
import UserList from './UsersList'
import { mockedUser, customRender } from '../../utils/testHelpers'

jest.mock('axios')
describe('UserList', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should fetch data from correct endpoint', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({}))

    customRender(<UserList />)
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith(
      `https://jsonplaceholder.typicode.com/users`
    )
  })
  it('show list of users, when api request was successful', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: [mockedUser] })
    )
    customRender(<UserList />)

    screen.getByAltText(/Loading/i)
    await screen.findByText(mockedUser.name)

    screen.getByText(mockedUser.email)
    screen.getByText(mockedUser.website)
    screen.getByText(mockedUser.company.name)
    screen.getByText(mockedUser.company.catchPhrase)
    screen.getByText(mockedUser.company.bs)
  })
  it('show error message when api request was rejected', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error('fail')))
    customRender(<UserList />)

    screen.getByAltText(/Loading/i)
    await screen.findByText('Ups, we have some connection error')
  })
})
