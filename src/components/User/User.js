import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { UserPropType } from '../../PropTypes'
import { SingleUser, UserContact, UsersCompany, StyledLink } from './style'

const User = ({ userId, users }) => {
  const {
    id,
    name,
    phone,
    email,
    website,
    company: { name: companyName, catchPhrase, bs }
  } = users[userId]
  return (
    <SingleUser>
      <div>{name}</div>
      <UserContact>
        <p>{email}</p>
        <p>{phone}</p>
        <p>{website}</p>
      </UserContact>
      <UsersCompany>
        <p>{companyName}</p>
        <p>{catchPhrase}</p>
        <p>{bs}</p>
      </UsersCompany>
      <StyledLink to={`/user/${id}`}>Details</StyledLink>
    </SingleUser>
  )
}
User.propTypes = {
  users: PropTypes.arrayOf(UserPropType).isRequired,
  userId: PropTypes.number.isRequired
}
const mapStateToProps = state => ({
  users: state.data.users
})
// User.whyDidYouRender = true
export default connect(mapStateToProps)(User)
