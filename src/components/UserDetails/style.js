import styled from 'styled-components'

const PostsContainer = styled.div`
  padding: 3vw;
  display: flex;
  flex-direction: column;
  width: 90vw;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

const UserPosts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
export { PostsContainer, UserPosts }
