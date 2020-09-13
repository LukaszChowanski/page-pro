import React from 'react'
import 'mutationobserver-shim'
import { fireEvent, screen, act } from '@testing-library/react'
import { customRender } from '../../../utils/testHelpers'
import AddCommentForm from './AddCommentForm'

describe('AddCommentForm', () => {
  const errorRequiredMsg = /This field is required/i
  const errorEmailMsg = /Invalid email adress/i
  const onCancelMock = jest.fn()
  const onSubmitMock = jest.fn()

  beforeEach(async () => {
    customRender(
      <AddCommentForm submit={onSubmitMock} onCancel={onCancelMock} />,
      {
        route: '/user/2/11',
        path: '/user/:userId/:postId'
      }
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should render without crash', () => {
    screen.getByRole('heading', { name: 'Add comment' })
    screen.getByLabelText('Name')
    screen.getByLabelText('E-mail')
    screen.getByLabelText('Body')
    screen.getByRole('button', { name: 'Save' })
    screen.getByRole('button', { name: 'Cancel' })
  })
  it('should display required error when value is invalid', async () => {
    const expectedNumberOfMsg = 3
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(await screen.findAllByText(errorRequiredMsg)).toHaveLength(
      expectedNumberOfMsg
    )
    expect(onSubmitMock).not.toBeCalled()
  })
  it('should display required error when e-mail is invalid', async () => {
    const expectedNumberOfRequiredMsg = 2
    const expectedNumberOfEmailMsg = 1
    fireEvent.input(screen.getByLabelText(/E-mail/i), {
      target: {
        value: 'invalidEmail'
      }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(await screen.findAllByText(errorRequiredMsg)).toHaveLength(expectedNumberOfRequiredMsg)
    expect(await screen.findAllByText(errorEmailMsg)).toHaveLength(expectedNumberOfEmailMsg)
    expect(onSubmitMock).not.toBeCalled()
  })

  it('should call onCancel function', async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onCancelMock).toHaveBeenCalled()
  })
  it('should not display error when value is valid + api call', async () => {
    fireEvent.input(screen.getByLabelText(/name/i), {
      target: {
        value: 'custom name'
      }
    })
    fireEvent.input(screen.getByLabelText(/E-mail/i), {
      target: {
        value: 'customemail@gmail.com'
      }
    })
    fireEvent.input(screen.getByLabelText(/body/i), {
      target: {
        value: 'custom body'
      }
    })
    // dont know how avoid using act
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    })

    expect(onSubmitMock).toBeCalledTimes(1)
    expect(onSubmitMock).toHaveBeenCalledWith('comments', {
      body: 'custom body',
      email: 'customemail@gmail.com',
      name: 'custom name',
      // mocked postId = 11
      postId: 11
    })
  })
})
