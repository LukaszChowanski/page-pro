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
  & > ::before {
    content: '';
    width: 100%;
    height: 10px;
    border-bottom: 2px solid black;
  }
  & > ::after {
    content: '';
    width: 100%;
    height: 10px;
    border-top: 2px solid black;
    margin-top: 5px;
  }
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
  margin: 5px 0 2px 0;
  > label {
    width: 95%;
    position: relative;
    > input {
      position: absolute;
      min-width: 85%;
      left: 15%;
      @media (max-width: 850px) {
        left: 20%;
      }
    }
  }
`
export const TextareaContainer = styled(InputContainer)`
  > label {
    height: 90px;
    > textarea {
      min-height: 90%;
      position: absolute;
      left: 15%;
      min-width: 85%;
      @media (max-width: 850px) {
        left: 20%;
      }
    }
  }
`
export const ErrorContainer = styled.div`
  position: relative;
  color: red;
  left: 21%;
`
