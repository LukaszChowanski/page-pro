import React from 'react'
import { ErrorContainer } from './style'

const errors = {
    required: 'This field is required',
    email: 'Invalid email adress'
}
type Props = {
    required?: boolean
    email?: boolean
}

const FormError = ({ required }: Props): React.ReactElement => {
    const displayError = required ? errors.required : errors.email
    return <ErrorContainer>{displayError}</ErrorContainer>
}

export default FormError
