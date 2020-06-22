import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar'
import BlogItem from './components/BlogItem';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import UserList from './components/UserList';
import User from './components/User';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initUser, setUser } from './reducers/loginReducer'
import { initializeBlogs, createBlog, likeBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"
import Container from '@material-ui/core/Container'

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const initBlogs = useSelector(state => state.blogReducer).sort((a, b) => b.likes - a.likes)
  const currentUser = useSelector(state => state.loginReducer)
  const users = useSelector(state => state.userReducer)

  const dispatch = useDispatch()

  const blogFormRef = React.createRef();

  useEffect(() => {
    dispatch(initializeBlogs()) 
    dispatch(initializeUsers())
  },[dispatch]) 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(initUser({ username, password })) 
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 5))
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(setUser(null));
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      dispatch(createBlog(blogObject))
      dispatch(setNotification(`you created succesfully '${blogObject.title}'`, 5))
    } catch (exception) {
      dispatch(setNotification('Wrong info', 5))
    }
  };

  const addLike = async (id, blogObject) => {
    try {
      dispatch(likeBlog(id, blogObject))
      dispatch(setNotification(`${blogObject.title} has now ${blogObject.likes + 1} likes.`, 5))
    } catch (exception) {
      dispatch(setNotification('Error', 5))
    }
  };

  // const removeBlog = async (blogObject) => {
  //   try {
  //     dispatch(terminateBlog(blogObject))
  //     dispatch(setNotification(`${blogObject.title} has now been removed.`, 5))
  //   } catch (exception) {
  //     dispatch(setNotification('Error', 5))
  //   }
  // };


  return (
    <Container>
    <Router>
    <div>
      <NavBar user={currentUser} handleLogout={handleLogout}/>
      <Notification/>
        {currentUser === null ? 
        <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          /> : ''}
    </div>

      <Switch>
        <Route path="/users/:id">
          <User users={users}/>
        </Route>
        <Route path="/users">
          <UserList users={users}/>
        </Route>
        <Route path="/blogs/:id">
          <BlogItem blogs={initBlogs} addLike={addLike} />
        </Route>
        <Route path="/">        
          {currentUser === null ? '' :
            <div>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
              </Togglable>
              <BlogList blogs={initBlogs} />
            </div>}
        </Route>
      </Switch>

    </Router>
    </Container>
  );
};

export default App;