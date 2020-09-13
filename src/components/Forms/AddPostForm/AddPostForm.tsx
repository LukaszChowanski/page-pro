import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  FormContainer,
  ButtonContainer,
  ButtonCancel,
  ButtonSave,
  StyledForm
} from '../style'
import { PostDataType, DataToUpload } from '../../../utils/declarations'
import Input from '../Input'
import Textarea from '../Textarea'
import useClickOutsideRef from '../../../hook/useClickOutsideRef'

type FormValues = {
  title: string
  body: string
}
type Props = {
  submit: (dataType: PostDataType, data: DataToUpload) => void
  onCancel: () => void
}

const AddPostForm = ({ onCancel, submit }: Props): React.ReactElement => {
  const { register, handleSubmit, errors } = useForm<FormValues>()
  const { userId } = useParams()
  const myRef = useRef(null)
  const onSubmit = ({ title, body }: FormValues): void => {
    const newPost = {
      userId: Number(userId),
      title,
      body
    }
    submit('posts', newPost)
    onCancel()
  }

  useClickOutsideRef(myRef, onCancel)

  return (
    <FormContainer>
      <StyledForm
        onSubmit={handleSubmit(onSubmit)}
        ref={myRef}
        data-testid="myForm"
      >
        <h3>Add post</h3>
        <Input
          label="Title"
          id="title"
          errors={errors.title}
          ref={register({ required: true })}
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
export default React.memo(AddPostForm)
