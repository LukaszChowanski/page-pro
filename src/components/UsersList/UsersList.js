import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import User from '../User/User'
import { getData } from '../../actions'
import { UserPropType } from '../../PropTypes'
import UsersContainer from './style'

const UsersList = ({ data, getData }) => {
  useEffect(() => {
    getData('users')
  }, [])

  const users = data.map(item => <User key={item.id} userId={item.id - 1} us />)
  return <UsersContainer>{users}</UsersContainer>
}

UsersList.propTypes = {
  getData: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(UserPropType).isRequired
}
const mapStateToProps = state => ({
  data: state.data.users
})
export default connect(mapStateToProps, { getData })(UsersList)
