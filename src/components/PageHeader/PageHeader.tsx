import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Name, Back, Button, AddPost, PlusIcon } from './style'

interface Props {
  name: string
  addPostButtonHandler?: () => void
}
const PageHeader = ({
  name,
  addPostButtonHandler
}: Props): React.ReactElement => {
  const history = useHistory()
  const backButtonHandler = () => history.goBack()
  return (
    <Container>
      <Button data-testid="backButton" onClick={backButtonHandler}>
        <Back />
      </Button>

      <Name>{name}</Name>

      {addPostButtonHandler && (
        <AddPost data-testid="addPostIcon" onClick={addPostButtonHandler}>
          <PlusIcon />
        </AddPost>
      )}
    </Container>
  )
}

PageHeader.displayName = 'PageHeader'
export default React.memo(PageHeader)
