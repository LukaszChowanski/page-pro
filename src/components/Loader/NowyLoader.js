import React from 'react'
import Container from './style'

const NowyLoader = React.memo(() => (
  <Container>
    <img src="https://i.gifer.com/Eqjd.gif" alt="loading" />
  </Container>
))
NowyLoader.whyDidYouRender = true
export default NowyLoader
