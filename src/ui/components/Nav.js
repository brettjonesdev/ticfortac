import React from 'react'
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}))

const Nav = () => {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Tic-tac-toe
        </Typography>
        <Button href="https://github.com/brettjonesdev/tictactoe">Code</Button>
        <Button href="https://brettjonesdev.com">Made with ❤️ by Brett</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Nav
