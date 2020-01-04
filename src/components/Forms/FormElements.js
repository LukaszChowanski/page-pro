import React from 'react'
import {
  InputContainer,
  Label,
  StyledInput,
  ErrorContainer,
  TextareaContainer,
  StyledTextarea
} from './style'

export const Input = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <StyledInput {...input} type={type} error />
      {touched && error && <ErrorContainer>{error}</ErrorContainer>}
    </InputContainer>
  )
}

export const Textarea = ({ input, label, meta: { touched, error } }) => {
  return (
    <TextareaContainer>
      <Label>{label}</Label>
      <StyledTextarea {...input} error />
      {touched && (error && <ErrorContainer>{error}</ErrorContainer>)}
    </TextareaContainer>
  )
}
