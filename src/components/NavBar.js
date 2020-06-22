import React from 'react'
import { Link } from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    Button,
  } from '@material-ui/core'

const NavBar = ({user, handleLogout}) => {
  console.log(user)
return (
<AppBar position="static">
  <Toolbar>
    <Button color="inherit" component={Link} to="/">
      blogs
    </Button>
    <Button color="inherit" component={Link} to="/users">
      users
    </Button>   
    {user === null
      ? <Button color="inherit" component={Link} to="/login">
          login
        </Button>
      : <><em>{user.username} logged in</em><Button color="inherit" onClick={handleLogout} >logout</Button></>    
      }                              
  </Toolbar>
</AppBar>
)
}

export default NavBar;