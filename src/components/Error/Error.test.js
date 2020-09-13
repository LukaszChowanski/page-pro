import React from 'react'
import { render, screen } from '@testing-library/react'
import Error from './Error'

describe('Error', () => {
  it('should display passed error', () => {
    const myError = 'we have minor problems'
    render(<Error error={myError} />)

    screen.getByText(myError)
  })
})
