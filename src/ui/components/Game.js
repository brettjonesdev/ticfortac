import React, { useContext } from 'react'
import { Box, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import GameBoard from './GameBoard'
import GameContext from '../../state/GameContext'
import GameControls from './GameControls'
import SelectDifficulty from './SelectDifficulty'
import { CATS_GAME } from '../../constants'
import CatIcon from './CatIcon'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  board: {
    display: 'flex',
    flexDirection: 'column',
  },
  alert: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontSize: '1.8em',
  },
  catIcon: {
    width: 40,
    height: 40,
    color: theme.palette.secondary.contrastText,
  },
}))

/**
 * Render a game board
 * @return {*}
 * @constructor
 */
const Game = () => {
  const classes = useStyles()
  const { outcome, newGame } = useContext(GameContext)
  return (
    <Box className={classes.container}>
      <Box className={classes.board}>
        <GameControls />
        <GameBoard />
        <SelectDifficulty />
      </Box>
      {outcome === CATS_GAME && (
        <Snackbar
          open
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onClose={newGame}
        >
          <Alert
            icon={<CatIcon className={classes.catIcon} />}
            className={classes.alert}
            onClose={newGame}
          >
            Cat's game
          </Alert>
        </Snackbar>
      )}
    </Box>
  )
}

export default Game
