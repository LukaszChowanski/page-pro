import styled from 'styled-components'

import { ArrowBack } from 'styled-icons/typicons/ArrowBack'
import { Link } from 'react-router-dom'
import { Plus } from 'styled-icons/fa-solid/Plus'

const Container = styled.div`
  width: 95%;
  position: relative;
  margin-bottom: 10vh;
  margin-top: 10vh;
`
const Name = styled.h2`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
const Back = styled(ArrowBack)`
  color: ${({ theme }) => theme.primary};
  width: 50px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  &:visited {
    color: ${({ theme }) => theme.primary};
  }
`
const AddPost = styled.button`
  position: absolute;
  right: 0;
  background-color: ${({ theme }) => theme.primary};
  color: red;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`
const PlusIcon = styled(Plus)`
  width: 20px;
  color: white;
`
export { Container, Name, Back, StyledLink, AddPost, PlusIcon }
