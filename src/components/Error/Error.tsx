import React from 'react'
import { ErrorWrapper, ErrorText } from './style'

type Props = {
  error: string
}

const Error = ({ error }: Props): React.ReactElement => {
  return (
    <ErrorWrapper>
      <ErrorText>{error}</ErrorText>
    </ErrorWrapper>
  )
}

export default Error
