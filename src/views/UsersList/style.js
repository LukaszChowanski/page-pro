import styled from 'styled-components'

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  padding: 5vh 5vw;
  grid-gap: 15px;
  font-size: 0.7em;
`
export default GridContainer
