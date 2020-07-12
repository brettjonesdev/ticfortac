import React, { useContext } from 'react'
import { Box, Chip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import StrategyContext from '../../state/StrategyContext'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  strategy: {
    marginLeft: theme.spacing(1),
  },
  label: {
    flexGrow: 1,
  },
}))

const SelectDifficulty = () => {
  const classes = useStyles()
  const { strategy, setStrategy, strategies } = useContext(StrategyContext)

  return (
    <Box className={classes.root}>
      <Typography variant="button" className={classes.label}>
        Difficulty
      </Typography>

      {strategies.map((Strategy) => (
        <Chip
          key={Strategy.title}
          className={classes.strategy}
          label={Strategy.title}
          color={strategy instanceof Strategy ? 'primary' : undefined}
          onClick={() => setStrategy(new Strategy())}
        />
      ))}
    </Box>
  )
}

export default SelectDifficulty
