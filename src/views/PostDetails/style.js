import styled from 'styled-components'

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 90vw;
  margin: 0 auto;
`
const FlexRowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`
const Title = styled.div`
  font-weight: bolder;
  padding-bottom: 1em;
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
export { FlexContainer, FlexRowContainer, Title, CommentsButton }
