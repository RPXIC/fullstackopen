import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from 'reducers/notificationReducer'
import blogReducer from 'reducers/blogReducer'
import isVisibleReducer from 'reducers/isVisibleReducer'
import usersReducer from 'reducers/usersReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  isVisible: isVisibleReducer,
  users: usersReducer,
  user: userReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
