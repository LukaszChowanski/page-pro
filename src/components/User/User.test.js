import React from 'react'
import { fireEvent } from '@testing-library/react'
import User from './User'
import { mockedUser, customRender } from '../../utils/testHelpers'

it('render with given props', () => {
  const { getByText } = customRender(<User user={mockedUser} />)

  getByText('Leanne Graham')
  getByText('1-770-736-8031 x56442')
  getByText('Sincere@april.biz')
  getByText('hildegard.org')
  getByText('Romaguera-Crona')
  getByText('Multi-layered client-server neural-net')
  getByText('harness real-time e-markets')
})
it('change route after click on Link', () => {
  const { getByText, history } = customRender(<User user={mockedUser} />)
  fireEvent.click(getByText('Details'))
  expect(history.location.pathname).toEqual('/user/1')
})
