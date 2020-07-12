import React, { useContext } from 'react'
import { Box, Button, Chip, Typography } from '@material-ui/core'
import GameContext from '../../state/GameContext'
import { makeStyles } from '@material-ui/styles'
import { Computer, Face } from '@material-ui/icons'
import { AI, PLAYER } from '../../constants'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing(1),
  },
  player: {
    width: 120,
    height: 36,
  },
  middle: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const GameControls = () => {
  const classes = useStyles()
  const { victor, turn, setFirstMove, newGame } = useContext(GameContext)

  const playerProps = {
    icon: <Face />,
    color: turn === PLAYER ? 'primary' : undefined,
    label: 'Player',
    onClick: turn ? undefined : () => setFirstMove(PLAYER),
  }
  const computerProps = {
    icon: <Computer />,
    color: turn === AI ? 'primary' : undefined,
    label: 'Computer',
    onClick: turn ? undefined : () => setFirstMove(AI),
  }
  return (
    <Box className={classes.root}>
      <Chip className={classes.player} {...playerProps} />
      <Box className={classes.middle}>
        {turn ? (
          <Button onClick={() => newGame()}>
            {victor ? 'New Game' : 'Start Over'}
          </Button>
        ) : (
          <Typography variant="button">Who moves first?</Typography>
        )}
      </Box>

      <Chip className={classes.player} {...computerProps} />
    </Box>
  )
}

export default GameControls
