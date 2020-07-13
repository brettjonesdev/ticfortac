import { makeStyles } from '@material-ui/styles'
import { WIDTH_LARGE, WIDTH_MEDIUM, WIDTH_SMALL, WIDTH_XL } from './Square'
import { MARKER_O, MARKER_X } from '../../../constants'
import Close from '@material-ui/icons/Close'
import clsx from 'clsx'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import React from 'react'

// "x" and "o" icons are not the same size, have to adjust X to be proportional
const xIcon = (width) => ({
  fontSize: (1.2 * width) / 2,
})
const oIcon = (width) => ({
  fontSize: width / 2,
})

const useStyles = makeStyles((theme) => ({
  marker: { color: theme.palette.primary.contrastText },
  xIcon: {
    [theme.breakpoints.down('sm')]: xIcon(WIDTH_SMALL),
    [theme.breakpoints.up('md')]: xIcon(WIDTH_MEDIUM),
    [theme.breakpoints.up('lg')]: xIcon(WIDTH_LARGE),
    [theme.breakpoints.up('xl')]: xIcon(WIDTH_XL),
  },
  oIcon: {
    [theme.breakpoints.down('sm')]: oIcon(WIDTH_SMALL),
    [theme.breakpoints.up('md')]: oIcon(WIDTH_MEDIUM),
    [theme.breakpoints.up('lg')]: oIcon(WIDTH_LARGE),
    [theme.breakpoints.up('xl')]: oIcon(WIDTH_XL),
  },
}))

const Marker = ({ marker }) => {
  const classes = useStyles()

  return marker === MARKER_X ? (
    <Close className={clsx(classes.marker, classes.xIcon)} />
  ) : marker === MARKER_O ? (
    <RadioButtonUncheckedIcon className={clsx(classes.marker, classes.oIcon)} />
  ) : null
}

export default Marker
