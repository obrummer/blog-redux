import loginService from '../services/login'
import blogService from '../services/blogs'

export const initUser = credentials => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
    blogService.setToken(user.token);
    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

export const setUser = user => {
    return async dispatch => {
      dispatch({
        type: 'CHECK',
        data: user,
      })
    }
}

const loginReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.data
    case 'CHECK':
      return action.data
    default:
      return state
  }
}

export default loginReducer