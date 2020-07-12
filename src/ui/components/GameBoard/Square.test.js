import React from 'react'
import Square from './Square'
import GameContext from '../../../state/GameContext'
import { mount } from 'enzyme'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import { Close } from '@material-ui/icons'
import { MARKER_O, MARKER_X, PLAYER } from '../../../constants'

const theme = createMuiTheme()

const withGame = (gameValue) => (children) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GameContext.Provider value={gameValue}>{children}</GameContext.Provider>
    </ThemeProvider>
  )
}

it('should call makeMove when clicked', async () => {
  const board = []
  board[2] = MARKER_X
  board[5] = MARKER_O
  const makeMove = jest.fn().mockImplementation((position) => {
    board[position] = MARKER_X
  })
  const wrapper = mount(
    withGame({ board, makeMove, turn: PLAYER, upNextMarker: MARKER_X })(
      <Square position={1} />
    )
  )
  expect(wrapper.find(Close).length).toBe(0)
  wrapper.find(Square).simulate('click')
  expect(makeMove).toHaveBeenCalledWith(1)
})

it('should display appropriate icon and call makeMove when clicked', async () => {
  const board = []
  board[2] = MARKER_X
  board[5] = MARKER_O
  const wrapper = mount(
    withGame({ board, turn: PLAYER, upNextMarker: MARKER_X })(
      <Square position={2} />
    )
  )
  expect(wrapper.find(Close).length).toBe(1)
})
