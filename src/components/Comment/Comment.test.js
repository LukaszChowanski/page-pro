import React from 'react'
import { render, screen } from '@testing-library/react'
import Comment from './Comment'
import { mockedComment } from '../../utils/testHelpers'

describe('Comment', () => {
  it('renders the component with given props', () => {
    render(<Comment item={mockedComment} />)

    screen.getByText(mockedComment.name)
    screen.getByText(mockedComment.email)
    screen.getByText(new RegExp(mockedComment.body.slice(0, 10), 'i'))
  })
})
