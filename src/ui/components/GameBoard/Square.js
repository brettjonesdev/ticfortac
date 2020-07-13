import React, { useCallback, useContext } from 'react'
import GameContext from '../../../state/GameContext'
import clsx from 'clsx'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { AI, PLAYER } from '../../../constants'
import Marker from './Marker'

const dimensions = (width) => ({
  width,
  height: width,
})

export const WIDTH_SMALL = 80
export const WIDTH_MEDIUM = 150
export const WIDTH_LARGE = 180
export const WIDTH_XL = 300

const useStyles = makeStyles((theme) => ({
  square: {
    [theme.breakpoints.down('sm')]: dimensions(WIDTH_SMALL),
    [theme.breakpoints.up('md')]: dimensions(WIDTH_MEDIUM),
    [theme.breakpoints.up('lg')]: dimensions(WIDTH_LARGE),
    [theme.breakpoints.up('xl')]: dimensions(WIDTH_XL),
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
  winningPosition: {
    backgroundColor: theme.palette.secondary.main,
    animation: `$color 2000ms ${theme.transitions.easing.easeInOut}`,
    animationIterationCount: 'infinite',
  },
  '@keyframes color': {
    '0%': {
      backgroundColor: theme.palette.secondary.main,
    },
    '50%': {
      backgroundColor: theme.palette.secondary.light,
    },
    '100': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))

const Square = ({
  position,
  borderLeft,
  borderRight,
  borderTop,
  borderBottom,
}) => {
  const {
    board,
    makeMove,
    outcome,
    turn,
    setFirstMove,
    winningPositions,
  } = useContext(GameContext)

  const marker = board[position]
  const canMakeMove = !outcome && !marker && turn !== AI
  const classes = useStyles()
  const className = clsx(classes.square, {
    [classes.borderLeft]: borderLeft,
    [classes.borderRight]: borderRight,
    [classes.borderTop]: borderTop,
    [classes.borderBottom]: borderBottom,
    [classes.disabled]: !canMakeMove,
    [classes.winningPosition]:
      winningPositions && winningPositions.includes(position),
  })

  const moveHandler = useCallback(() => {
    if (!turn) {
      setFirstMove(PLAYER)
    }
    makeMove(position)
  }, [makeMove, position, setFirstMove, turn])

  const onClick = canMakeMove ? moveHandler : undefined
  return (
    <Box className={className} onClick={onClick}>
      <Marker marker={marker} />
    </Box>
  )
}

export default Square
