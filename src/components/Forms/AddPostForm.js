import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
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

const PostForm = props => {
  const { handleSubmit, onCancel, pristine, submitting, invalid } = props
  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <FormHeader />
        <h3>Add post</h3>
        <FieldContainer>
          <Field
            name="title"
            component={Input}
            label="Title"
            type="text"
            validate={required}
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
}

PostForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired
}
PostForm.whyDidYouRender = true
export default reduxForm({
  form: 'post'
})(PostForm)
