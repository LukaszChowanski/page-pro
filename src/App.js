// import './utils/wdyr'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UsersList from './views/UsersList/UsersList'
import UserDetails from './views/UserDetails/UserDetails'
import PostDetails from './views/PostDetails/PostDetails'
import MainTemplate from './Templates/MainTemplate'

const App = () => (
  <MainTemplate>
    <Router>
      <Switch>
        <Route exact path="/" component={UsersList} />
        <Route exact path="/user/:userId" component={UserDetails} />
        <Route exact path="/user/:userId/:postId" component={PostDetails} />
      </Switch>
    </Router>
  </MainTemplate>
)

export default App
