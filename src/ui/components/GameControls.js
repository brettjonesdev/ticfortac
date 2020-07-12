import React, { useCallback, useContext, useEffect } from 'react'
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Typography,
} from '@material-ui/core'
import GameContext from '../../state/GameContext'
import { makeStyles } from '@material-ui/styles'
import { Computer, Face } from '@material-ui/icons'
import { AI, PLAYER } from '../../constants'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    margin: theme.spacing(1),
  },
  restart: {
    height: 24,
  },
  loading: {
    color: theme.palette.primary.contrastText,
  },
}))

const GameControls = () => {
  const classes = useStyles()
  const { turn, setFirstMove, newGame, outcome } = useContext(GameContext)
  const keydownListener = useCallback(
    (e) => {
      if (e.key === 'r') {
        newGame()
      }
    },
    [newGame]
  )
  useEffect(() => {
    window.addEventListener('keydown', keydownListener, true)
    return () => window.removeEventListener('keydown', keydownListener, true)
  }, [keydownListener])

  const playerProps = {
    icon: <Face />,
    color: turn === PLAYER ? 'primary' : undefined,
    label: 'Player',
    onClick: turn ? undefined : () => setFirstMove(PLAYER),
  }
  const computerProps = {
    icon:
      turn === AI && !outcome ? (
        <CircularProgress className={classes.loading} size={20} />
      ) : (
        <Computer />
      ),
    color: turn === AI ? 'primary' : undefined,
    label: 'Computer',
    onClick: turn ? undefined : () => setFirstMove(AI),
  }
  return (
    <Box className={classes.root}>
      <Chip className={classes.player} {...playerProps} />
      <Box className={classes.middle}>
        {turn ? (
          <Button className={classes.restart} onClick={newGame}>
            Restart (R)
          </Button>
        ) : (
          <Typography variant="button">First Move?</Typography>
        )}
      </Box>

      <Chip className={classes.player} {...computerProps} />
    </Box>
  )
}

export default GameControls
