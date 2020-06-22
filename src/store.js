import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    notificationReducer,
    blogReducer,
    loginReducer,
    userReducer,
  })

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))


export default store