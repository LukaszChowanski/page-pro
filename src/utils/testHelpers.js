import { Router, Route } from 'react-router-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import { render as rtl } from '@testing-library/react'
import { reducer, defaultState } from '../store/reducers'
// import configureStore from './configureStore'

export const customRender = (
  ui,
  {
    route = '/',
    path = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState = defaultState,
    store = createStore(reducer, initialState, applyMiddleware(thunk)),
    ...options
  } = {}
) => ({
  ...rtl(
    <Provider store={store}>
      <Router history={history}>
        <Route path={path}>{ui}</Route>
      </Router>
    </Provider>,
    options
  ),
  history
})

export const mockedUser = {
  id: 1,
  name: 'Leanne Graham',
  phone: '1-770-736-8031 x56442',
  email: 'Sincere@april.biz',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets'
  }
}
export const mockedPost = {
  id: 1,
  userId: 1,
  title:
    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body:
    'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
}
export const mockedComment = {
  postId: 1,
  id: 1,
  name: 'id labore ex et quam laborum',
  email: 'Eliseo@gardner.biz',
  body:
    'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
}
