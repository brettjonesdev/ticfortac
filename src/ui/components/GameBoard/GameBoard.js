import React, { useContext } from 'react'
import { Box, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import Square from './Square'
import GameControls from '../GameControls'
import GameContext from '../../../state/GameContext'
import { AI, CATS_GAME, PLAYER } from '../../../constants'
import SelectDifficulty from '../SelectDifficulty'
import { Computer, Face } from '@material-ui/icons'

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
}))

const OutcomeAlert = ({ outcome, ...props }) => {
  switch (outcome) {
    case PLAYER:
      return (
        <Alert icon={<Face />} severity="success" {...props}>
          {/*// TODO fun icons*/}
          You win!
        </Alert>
      )
    case CATS_GAME:
      return (
        <Alert severity="warning" {...props}>
          Cat's game
        </Alert>
      )
    case AI:
      return (
        <Alert icon={<Computer />} severity="error" {...props}>
          Computer wins!
        </Alert>
      )
    default:
      return null
  }
}

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
      {outcome && (
        <Snackbar
          open
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onClose={newGame}
        >
          <OutcomeAlert outcome={outcome} onClose={newGame} />
        </Snackbar>
      )}
    </Box>
  )
}

export default GameBoard
