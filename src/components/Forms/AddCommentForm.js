import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Input, Textarea } from './FormElements'
import {
  FormContainer,
  StyledForm,
  FormHeader,
  FormFooter,
  FieldContainer,
  Body,
  ButtonContainer,
  ButtonCancel,
  ButtonSave
} from './style'

// function to valid form
const required = value => (value ? undefined : 'This field is required')
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

const AddCommentForm = React.memo(props => {
  const { handleSubmit, onCancel, pristine, submitting, invalid } = props
  const myRef = useRef(null)

  useEffect(() => {
    const listener = event => {
      if (!myRef.current || myRef.current.contains(event.target)) {
        return
      }
      onCancel()
    }
    document.addEventListener('mousedown', listener)
  })

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit} ref={myRef}>
        <FormHeader />
        <h3>Add comment</h3>
        <FieldContainer>
          <Field
            name="name"
            component={Input}
            label="Name"
            type="text"
            validate={required}
          />
        </FieldContainer>
        <FieldContainer>
          <Field
            name="email"
            component={Input}
            label="Email"
            type="email"
            validate={[required, email]}
          />
        </FieldContainer>
        <Body>
          <Field
            name="body"
            label="Body"
            component={Textarea}
            validate={required}
          />
        </Body>
        <ButtonContainer>
          <ButtonCancel type="button" onClick={onCancel}>
            Cancel
          </ButtonCancel>
          <ButtonSave
            type="submit"
            onClick={handleSubmit}
            disabled={pristine || submitting || invalid}
          >
            Save
          </ButtonSave>
        </ButtonContainer>
        <FormFooter />
      </StyledForm>
    </FormContainer>
  )
})
AddCommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired
}
AddCommentForm.whyDidYouRender = true
export default reduxForm({
  form: 'comment'
})(AddCommentForm)
