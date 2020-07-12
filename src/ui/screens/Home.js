import React from 'react'
import { Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import GameBoard from '../components/GameBoard'
import { GameProvider } from '../../state/GameContext'
import { makeStyles } from '@material-ui/styles'
import { StrategyProvider } from '../../state/StrategyContext'
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
      <StrategyProvider>
        <GameProvider>
          <Typography className={classes.title} variant="h2">
            Tic-tac-toe
          </Typography>
          <GameBoard />
        </GameProvider>
      </StrategyProvider>
    </Box>
  )
}
export default Home
