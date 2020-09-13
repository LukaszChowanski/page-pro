import React from 'react'
import { FieldError } from 'react-hook-form'
import { ErrorContainer, TextareaContainer } from './style'

type Props = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  errors: FieldError | undefined
  label: string
  id: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ id, label, errors }, ref): React.ReactElement => {
    return (
      <TextareaContainer>
        <label htmlFor={id}>
          {label}
          <textarea id={id} name={id} ref={ref} />
        </label>
        {errors?.type === 'required' && (
          <ErrorContainer>This field is required</ErrorContainer>
        )}
      </TextareaContainer>
    )
  }
)
Textarea.displayName = 'Textarea'
export default React.memo(Textarea)
