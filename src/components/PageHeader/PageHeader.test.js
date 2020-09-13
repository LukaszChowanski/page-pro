import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { customRender } from '../../utils/testHelpers'
import PageHeader from './PageHeader'
import '@testing-library/jest-dom/extend-expect'

describe('UserList', () => {
  const buttonHadlerMock = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('render component without function to handle add button', () => {
    customRender(<PageHeader name="Ervin Howell" />)

    screen.getByText(/Ervin Howell/i)
    screen.queryByTestId('backButton')
    expect(screen.queryByTestId('addPostIcon')).not.toBeTruthy()
  })
  it('render addPost icon when function is passed', () => {
    customRender(
      <PageHeader name="Ervin Howell" addPostButtonHandler={buttonHadlerMock} />
    )

    screen.getByRole('heading', { name: 'Ervin Howell' })
    screen.getByTestId('backButton')
    screen.getByTestId('addPostIcon')
  })
  it('button handler function is called after click on button', () => {
    customRender(
      <PageHeader name="Ervin Howell" addPostButtonHandler={buttonHadlerMock} />
    )

    const addPostButton = screen.getByTestId('addPostIcon')
    fireEvent.click(addPostButton)
    expect(buttonHadlerMock).toHaveBeenCalledTimes(1)
  })
  // im not sure its valid test
  it('button to get back work as expected', () => {
    const history = createMemoryHistory()
    history.push({ pathname: '/users' })
    history.push({ pathname: '/users/2' })
    customRender(
      <PageHeader
        name="Ervin Howell"
        addPostButtonHandler={buttonHadlerMock}
      />,
      { history }
    )
    expect(history.location.pathname).toBe('/users/2')
    fireEvent.click(screen.getByTestId('backButton'))
    expect(history.location.pathname).toBe('/users')
  })
})
