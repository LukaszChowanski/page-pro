import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import Post from './Post'
import { customRender, mockedPost } from '../../utils/testHelpers'

describe('Posts', () => {
  const deletePost = jest.fn()
  const { id, userId, title: postTitle } = mockedPost
  const title = new RegExp(postTitle, 'i')

  it('render without crash', () => {
    customRender(<Post item={mockedPost} deleteData={deletePost} />)
    screen.getByText(title)
    screen.getByTestId('trash')
  })
  it('change route after click on title', () => {
    const { getByText, history } = customRender(
      <Post item={mockedPost} deleteData={deletePost} />
    )
    fireEvent.click(getByText(title))
    expect(history.location.pathname).toBe(`/user/${userId}/${id}`)
  })
  it('trigger delete function after click on trash icon', () => {
    customRender(<Post item={mockedPost} deleteData={deletePost} />)

    fireEvent.click(screen.getByTestId('trash'))
    expect(deletePost).toHaveBeenCalledTimes(1)
    expect(deletePost).toHaveBeenCalledWith(id)
  })
})
