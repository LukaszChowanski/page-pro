import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`
export const StyledForm = styled.form`
  background-color: white;
  width: 40%;
  max-width: 400px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 2px solid black;
`

export const FormHeader = styled.p`
  border-bottom: 2px solid black;
  width: 100%;
  height: 1em;
`
export const FormFooter = styled.div`
  border-top: 2px solid black;
  height: 1em;
  width: 100%;
  position: relative;
  bottom: 0;
  margin-top: 5px;
`
export const FieldContainer = styled.div`
  font-weight: 600;
  padding: 5px;
  width: 95%;
  position: relative;
`
export const Body = styled(FieldContainer)`
  height: 110px;
  width: 95%;
  position: relative;
`
export const ButtonContainer = styled.div`
  align-self: flex-end;
  margin-right: 6%;
`
export const Button = styled.button`
  width: 60px;
  height: 30px;
  box-shadow: 2px 2px 1px black;
  border: 1px solid black;
  font-weight: bold;
  font-size: 0.7em;
`
export const ButtonCancel = styled(Button)`
  margin-right: 10px;
`

export const ButtonSave = styled(Button)`
  background-color: ${props => (props.disabled ? 'grey' : props.theme.primary)};
  color: white;
  margin-right: 12px;
`
export const InputContainer = styled.div`
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
`
export const StyledInput = styled.input`
  width: 75%;
  flex-grow: 2;
`
export const Label = styled.label`
  width: 20%;
`
export const TextareaContainer = styled(InputContainer)`
  height: 90px;
`
export const StyledTextarea = styled.textarea`
  width: 75%;
  flex-grow: 2;
`
export const ErrorContainer = styled.div`
  position: relative;
  color: red;
  left: 21%;
`
