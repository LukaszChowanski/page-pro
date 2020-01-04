import React from 'react'
import PropTypes from 'prop-types'
import { ErrorWrapper, ErrorText } from './style'

const Error = ({ error }) => {
  return (
    <ErrorWrapper>
      <ErrorText>{error}</ErrorText>
    </ErrorWrapper>
  )
}

Error.propTypes = {
  error: PropTypes.string.isRequired
}
Error.whyDidYouRender = true
export default Error
