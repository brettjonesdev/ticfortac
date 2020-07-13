import { makeMove, gameReducer, setFirstMove } from './game'
import { AI, MARKER_O, MARKER_X, PLAYER } from '../constants'

test('Complete game', () => {
  let state = gameReducer()
  state = gameReducer(state, setFirstMove(PLAYER))
  expect(state.turn).toBe(PLAYER)
  expect(state.upNextMarker).toBe(MARKER_X)
  state = gameReducer(state, makeMove(0))
  expect(state.turn).toBe(AI)
  expect(state.board).toEqual([MARKER_X])

  state = gameReducer(state, makeMove(1))
  expect(state.turn).toBe(PLAYER)
  expect(state.board).toEqual([MARKER_X, MARKER_O])

  state = gameReducer(state, makeMove(8))
  expect(state.turn).toBe(AI)
  expect(state.board).toEqual([
    MARKER_X,
    MARKER_O,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    MARKER_X,
  ])

  state = gameReducer(state, makeMove(7))
  expect(state.turn).toBe(PLAYER)
  expect(state.board).toEqual([
    MARKER_X,
    MARKER_O,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    MARKER_O,
    MARKER_X,
  ])

  state = gameReducer(state, makeMove(4))
  expect(state.outcome).toBe(PLAYER)
  expect(state.board).toEqual([
    MARKER_X,
    MARKER_O,
    undefined,
    undefined,
    MARKER_X,
    undefined,
    undefined,
    MARKER_O,
    MARKER_X,
  ])
})
