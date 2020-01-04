import styled from 'styled-components'

const FlexRowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 90vw;
  height: 100vh;
  margin: 0 auto;
`
const CommentsButton = styled.button`
  color: ${({ theme }) => theme.primary};
  width: 100px;
  height: 40px;
  background-color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  font-size: 0.7em;
`
export { FlexRowContainer, FlexContainer, CommentsButton }
