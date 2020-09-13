import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Trash } from 'styled-icons/typicons/Trash'
import { KeyboardArrowRight } from 'styled-icons/material/KeyboardArrowRight'

const PostsItem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 95%;
  height: 45px;
  border: 2px solid black;
  padding: 5px;
  margin-bottom: 1em;
  font-weight: bold;
`
const Delete = styled(Trash)`
  color: ${({ theme }) => theme.primary};
  max-width: 30px;
  min-width: 30px;
  cursor: pointer;
`
const PostTitle = styled.p`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
const Details = styled(KeyboardArrowRight)`
  color: ${({ theme }) => theme.primary};
  max-width: 30px;
  min-width: 30px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  max-width: 90%;
  min-width: 90%;
  justify-self: start;

  @media (max-width: 768px) {
    max-width: 75%;
    min-width: 75%;
  }
`
export { PostsItem, Delete, PostTitle, Details, StyledLink }
