import styled from 'styled-components'

const ErrorWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ErrorText = styled.div`
  padding: 10px;
  z-index: 10;
  border: 2px solid black;
`
export { ErrorWrapper, ErrorText }
