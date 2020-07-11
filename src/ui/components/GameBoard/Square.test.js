import React from 'react'
import Square from './Square'
import GameContext, { MARKER_O, MARKER_X } from '../../../state/GameContext'
import { mount } from 'enzyme'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import { Close } from '@material-ui/icons'

const theme = createMuiTheme()

const withGame = (props) => (children) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GameContext.Provider value={props}>{children}</GameContext.Provider>
    </ThemeProvider>
  )
}

it('should display appropriate icon and call makeMove when clicked', async () => {
  const board = []
  board[2] = MARKER_X
  board[5] = MARKER_O
  const makeMove = jest.fn()
  const wrapper = mount(withGame({ board, makeMove })(<Square position={1} />))
  expect(wrapper.find(Close).length).toBe(1)
  wrapper.find(Square).simulate('click')
  expect(makeMove).toHaveBeenCalledWith(1)
})
