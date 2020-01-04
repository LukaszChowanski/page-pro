import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' // , Route, Switch
import UsersList from './components/UsersList/UsersList'
import UserDetails from './components/UserDetails/UserDetails'
import PostDetails from './components/PostDetails/PostDetails'
import MainTemplate from './components/MainTemplate'

const App = () => ({
  render() {
    return (
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
  }
})

export default App
