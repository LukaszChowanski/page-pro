import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CommentsSection from './CommentsSection'
import { mockedComment } from '../../utils/testHelpers'

describe('CommentsSection', () => {
  const setIsVisible = jest.fn()
  const handleAddCommentButton = jest.fn()
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should render Show Comments button on start if isVisible is true', () => {
    render(
      <CommentsSection
        isVisible={false}
        setIsVisibile={setIsVisible}
        handleAddCommentButton={handleAddCommentButton}
        comments={[mockedComment]}
      />
    )
    screen.getByRole('button', { name: 'Show Comments' })
  })
  it('should show "Hide", "Add Coments" buttons and passed comments ', () => {
    render(
      <CommentsSection
        isVisible
        setIsVisible={setIsVisible}
        handleAddCommentButton={handleAddCommentButton}
        comments={[mockedComment]}
      />
    )
    screen.getByRole('button', { name: 'Hide comments' })
    screen.getByRole('button', { name: 'Add comment' })
    screen.getByText(mockedComment.name)
    screen.getByText(mockedComment.email)
    screen.getByText(new RegExp(mockedComment.email, 'i'))
  })
  it('should call functions when buttons is click', () => {
    const { rerender } = render(
      <CommentsSection
        isVisible={false}
        changeVisibility={setIsVisible}
        handleAddCommentButton={handleAddCommentButton}
        comments={[mockedComment]}
      />
    )
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Show Comments'
      })
    )
    expect(setIsVisible).toBeCalledTimes(1)

    rerender(
      <CommentsSection
        isVisible
        changeVisibility={setIsVisible}
        handleAddCommentButton={handleAddCommentButton}
        comments={[mockedComment]}
      />
    )
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Hide comments'
      })
    )
    expect(setIsVisible).toBeCalledTimes(2)

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Add comment'
      })
    )
    expect(handleAddCommentButton).toBeCalledTimes(1)
  })
})
