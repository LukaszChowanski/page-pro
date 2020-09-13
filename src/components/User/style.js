import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SingleUser = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  padding-left: 10px;
  padding-top: 15px;
`
const UserContact = styled.div`
  padding: 1em 0;
  color: blue;
  text-decoration: underline;
`
const UsersCompany = styled.div`
  padding-bottom: 2em;
`
const StyledLink = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  box-shadow: 2px 2px black;
  border: 2px solid black;
  margin-bottom: 1em;
  background: white;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
`
export { SingleUser, UserContact, UsersCompany, StyledLink }
