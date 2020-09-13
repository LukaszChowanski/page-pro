import React from 'react'
import { connect } from 'react-redux'

import User from '../../components/User/User'
import { RootState } from '../../store/reducers'
import { IUser } from '../../utils/declarations'
import { getUsers } from '../../store/selectors'
import GridContainer from './style'
import PageTemplate from '../../Templates/PageTemplate/PageTemplate'

type StateProps = {
  data: IUser[]
}
type Props = StateProps

const UsersList = ({ data }: Props): React.ReactElement => {
  return (
    <PageTemplate>
      <GridContainer>
        {data && data.map(item => <User key={item.id} user={item} />)}
      </GridContainer>
    </PageTemplate>
  )
}

const mapStateToProps = (state: RootState): StateProps => ({
  data: getUsers(state)
})
export default connect(mapStateToProps)(UsersList)
