import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  FormContainer,
  StyledForm,
  ButtonContainer,
  ButtonCancel,
  ButtonSave
} from '../style'
import { PostDataType, DataToUpload } from '../../../utils/declarations'
import useClickOutsideRef from '../../../hook/useClickOutsideRef'
import Input from '../Input'
import Textarea from '../Textarea'

type FormValues = {
  name: string
  email: string
  body: string
}
type Props = {
  submit: (dataType: PostDataType, data: DataToUpload) => void
  onCancel: () => void
}

const AddCommentForm = ({ submit, onCancel }: Props): React.ReactElement => {
  const { register, handleSubmit, errors } = useForm<FormValues>()
  const myRef = useRef(null)
  const { postId } = useParams()
  const onSubmit = ({ name, email, body }: FormValues): void => {
    const comment = {
      postId: Number(postId),
      name,
      email,
      body
    }
    submit('comments', comment)
    onCancel()
  }

  useClickOutsideRef(myRef, onCancel)

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit(onSubmit)} ref={myRef}>
        <h3>Add comment</h3>
        <Input
          id="name"
          label="Name"
          errors={errors.name}
          ref={register({ required: true })}
        />
        <Input
          id="email"
          label="E-mail"
          errors={errors.email}
          ref={register({
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
          })}
        />
        <Textarea
          label="Body"
          id="body"
          errors={errors.body}
          ref={register({ required: true })}
        />

        <ButtonContainer>
          <ButtonCancel type="button" onClick={onCancel}>
            Cancel
          </ButtonCancel>
          <ButtonSave type="submit">
            <span>Save</span>
          </ButtonSave>
        </ButtonContainer>
      </StyledForm>
    </FormContainer>
  )
}
export default React.memo(AddCommentForm)
