import styled from 'styled-components'

const CommentsItem = styled.div`
  width: 100%;
  border: 2px solid black;
  margin-bottom: 5px;
  padding: 10px;
  font-size: 0.7em;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`
const Title = styled.p`
  font-weight: 700;
`
const Email = styled(Title)`
  color: ${({ theme }) => theme.primary};
  text-decoration: underline;
`
export { CommentsItem, Header, Title, Email }
