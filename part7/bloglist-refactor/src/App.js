import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { NavBar } from 'components'
import { Home, UserDetailPage, UsersPage, BlogDetailsPage } from 'pages'

const App = () => (
  <div>
    <NavBar />
    <Switch>
      <Route path='/blogs/:id' component={BlogDetailsPage} />
      <Route path='/blogs'>
        <Redirect to={'/'} />
      </Route>
      <Route path='/users/:id' component={UserDetailPage} />
      <Route path='/users' component={UsersPage} />
      <Route path='/' component={Home} />
    </Switch>
  </div>
)

export default App
