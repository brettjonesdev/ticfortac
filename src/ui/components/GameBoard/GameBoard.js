import React, { useContext } from 'react'
import { Box, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import Square from './Square'
import GameControls from '../GameControls'
import GameContext from '../../../state/GameContext'
import SelectDifficulty from '../SelectDifficulty'
import CatIcon from '../CatIcon'
import { CATS_GAME } from '../../../constants'

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
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
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
const GameBoard = () => {
  const classes = useStyles()
  const { outcome, newGame } = useContext(GameContext)
  return (
    <Box className={classes.container}>
      <Box className={classes.board}>
        <GameControls />
        <Box className={classes.row}>
          <Square borderRight borderBottom position={0} />
          <Square borderRight borderLeft borderBottom position={1} />
          <Square borderLeft borderBottom position={2} />
        </Box>
        <Box className={classes.row}>
          <Square borderTop borderRight borderBottom position={3} />
          <Square borderRight borderLeft borderBottom borderTop position={4} />
          <Square borderLeft borderTop borderBottom position={5} />
        </Box>
        <Box className={classes.row}>
          <Square borderTop borderRight position={6} />
          <Square borderRight borderLeft borderTop position={7} />
          <Square borderTop borderLeft position={8} />
        </Box>
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

export default GameBoard
