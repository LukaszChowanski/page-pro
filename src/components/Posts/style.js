import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Trash } from 'styled-icons/typicons/Trash'
import { KeyboardArrowRight } from 'styled-icons/material/KeyboardArrowRight'

const PostsItem = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  border: 2px solid black;
  padding: 5px;
  margin-bottom: 1em;
  font-weight: bold;
`
const Delete = styled(Trash)`
  color: ${({ theme }) => theme.primary};
  width: 40px;
  cursor: pointer;
`
const PostTitle = styled.p`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 10px;
`
const Details = styled(KeyboardArrowRight)`
  color: ${({ theme }) => theme.primary};
  width: 40px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  width: 90%;
`
export { PostsItem, Delete, PostTitle, Details, StyledLink }
