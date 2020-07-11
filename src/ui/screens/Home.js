import React from 'react'
import { Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import GameBoard from '../components/GameBoard'
import { GameProvider } from '../../state/GameContext'
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    margin: theme.spacing(2),
  },
}))

const Home = () => {
  const classes = useStyles()

  return (
    <Box>
      <GameProvider>
        <Typography className={classes.title} variant="h2">
          Tic-tac-toe
        </Typography>
        <GameBoard />
      </GameProvider>
    </Box>
  )
}
export default Home
