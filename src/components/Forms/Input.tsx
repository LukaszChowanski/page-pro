import React from 'react'
import { FieldError } from 'react-hook-form'
import { InputContainer, ErrorContainer } from './style'

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  errors: FieldError | undefined
  label: string
  id: string
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ errors, label, id }, ref): React.ReactElement => {
    return (
      <InputContainer>
        <label htmlFor={id}>
          {label}
          <input id={id} name={id} ref={ref} />
          {errors?.type === 'required' && (
            <ErrorContainer>This field is required</ErrorContainer>
          )}
          {errors?.type === 'pattern' && (
            <ErrorContainer>Invalid email adress</ErrorContainer>
          )}
        </label>
      </InputContainer>
    )
  }
)
Input.displayName = 'Input'
export default React.memo(Input)
