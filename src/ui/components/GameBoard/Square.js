import React, { useCallback, useContext } from 'react'
import GameContext from '../../../state/GameContext'
import clsx from 'clsx'
import Close from '@material-ui/icons/Close'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { MARKER_O, MARKER_X, PLAYER } from '../../../constants'

const dimensions = (width) => ({
  width,
  height: width,
  fontSize: width / 2,
})
const useStyles = makeStyles((theme) => ({
  square: {
    [theme.breakpoints.down('sm')]: dimensions(80),
    [theme.breakpoints.up('md')]: dimensions(150),
    [theme.breakpoints.up('lg')]: dimensions(180),
    [theme.breakpoints.up('xl')]: dimensions(300),
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  borderRight: { borderRight: '3px solid white' },
  borderLeft: { borderLeft: '3px solid white' },
  borderTop: { borderTop: '3px solid white' },
  borderBottom: { borderBottom: '3px solid white' },
  disabled: { cursor: 'not-allowed' },
  marker: { color: theme.palette.primary.contrastText },
}))

const Square = ({
  position,
  borderLeft,
  borderRight,
  borderTop,
  borderBottom,
}) => {
  const { board, makeMove, outcome, turn } = useContext(GameContext)

  const marker = board[position]
  const canMakeMove = !outcome && !marker && turn === PLAYER
  const classes = useStyles()
  const className = clsx(classes.square, {
    [classes.borderLeft]: borderLeft,
    [classes.borderRight]: borderRight,
    [classes.borderTop]: borderTop,
    [classes.borderBottom]: borderBottom,
    [classes.disabled]: !canMakeMove,
  })

  const icon =
    marker === MARKER_X ? (
      <Close className={classes.marker} fontSize="inherit" />
    ) : marker === MARKER_O ? (
      <RadioButtonUncheckedIcon className={classes.marker} fontSize="inherit" />
    ) : null
  const moveHandler = useCallback(() => {
    makeMove(position)
  }, [makeMove, position])

  const onClick = canMakeMove ? moveHandler : undefined
  return (
    <Box className={className} onClick={onClick}>
      {icon}
    </Box>
  )
}

export default Square
