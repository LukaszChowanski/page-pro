import React from 'react'
import 'mutationobserver-shim'
import { fireEvent, screen, act } from '@testing-library/react'
import AddPostForm from './AddPostForm'
import { customRender } from '../../../utils/testHelpers'

describe('AddPostForm', () => {
  const errorMsg = /This field is required/i
  const mockedUserId = 2
  const onCancelMock = jest.fn()
  const onSubmitMock = jest.fn()

  beforeEach(async () => {
    customRender(
      <AddPostForm submit={onSubmitMock} onCancel={onCancelMock} />,
      {
        route: `/user/${mockedUserId}`,
        path: '/user/:userId'
      }
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render without crash', () => {
    screen.getByRole('heading', { name: 'Add post' })
    screen.getByLabelText('Title')
    screen.getByLabelText('Body')
    screen.getByRole('button', { name: 'Save' })
    screen.getByRole('button', { name: 'Cancel' })
  })
  it('should display required error when value is invalid', async () => {
    const expectedNumberOfMsg = 2
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(await screen.findAllByText(errorMsg)).toHaveLength(
      expectedNumberOfMsg
    )
    expect(onSubmitMock).not.toBeCalled()
  })
  it('should fire onCancel function', async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onCancelMock).toHaveBeenCalled()
  })
  it('should not display error when value is valid', async () => {
    fireEvent.input(screen.getByLabelText(/title/i), {
      target: {
        value: 'some random title'
      }
    })
    fireEvent.input(screen.getByLabelText(/body/i), {
      target: {
        value: 'some random body'
      }
    })
    // dont know how avoid using act
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    })

    expect(onSubmitMock).toHaveBeenCalledTimes(1)
    expect(onSubmitMock).toBeCalledWith('posts', {
      body: 'some random body',
      title: 'some random title',
      userId: mockedUserId
    })
  })
})
