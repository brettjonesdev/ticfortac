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
          Title
        </Typography>
        <Button href="https://github.com/brettjonesdev/" color="inherit">
          Developer
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Nav
