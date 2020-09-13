/* eslint-disable @typescript-eslint/member-delimiter-style */
import React from 'react'
import { SingleUser, UserContact, UsersCompany, StyledLink } from './style'
import { IUser } from '../../utils/declarations'

type Props = {
  user: IUser
}
const User: React.FC<Props> = ({
  user: {
    id,
    name,
    phone,
    email,
    website,
    company: { name: companyName, catchPhrase, bs }
  }
}) => {
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

export default User
