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
        <Button
          color="inherit"
          href="https://github.com/brettjonesdev/tictactoe"
        >
          Code
        </Button>
        <Button color="inherit" href="https://brettjonesdev.com">
          BrettJonesDev
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Nav
