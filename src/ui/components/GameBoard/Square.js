import React, { useCallback, useContext } from 'react'
import GameContext, { MARKER_O, MARKER_X } from '../../../state/GameContext'
import clsx from 'clsx'
import Close from '@material-ui/icons/Close'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const dimensions = (width) => ({
  width,
  height: width,
  fontSize: width / 2,
})
const useStyles = makeStyles((theme) => ({
  square: {
    [theme.breakpoints.down('sm')]: dimensions(80),
    [theme.breakpoints.up('md')]: dimensions(150),
    [theme.breakpoints.up('lg')]: dimensions(200),
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
  marked: { cursor: 'not-allowed' },
}))

const Square = ({
  position,
  borderLeft,
  borderRight,
  borderTop,
  borderBottom,
}) => {
  const { board, makeMove } = useContext(GameContext)

  const marker = board[position]
  const isMarked = !!marker
  const classes = useStyles()
  const className = clsx(classes.square, {
    [classes.borderLeft]: borderLeft,
    [classes.borderRight]: borderRight,
    [classes.borderTop]: borderTop,
    [classes.borderBottom]: borderBottom,
    [classes.marked]: isMarked,
  })

  const icon =
    marker === MARKER_X ? (
      <Close fontSize="inherit" />
    ) : marker === MARKER_O ? (
      <RadioButtonUncheckedIcon fontSize="inherit" />
    ) : null
  const moveHandler = useCallback(() => {
    makeMove(position)
  }, [makeMove, position])

  const onClick = isMarked ? undefined : moveHandler
  return (
    <Box className={className} onClick={onClick}>
      {icon}
    </Box>
  )
}

export default Square
