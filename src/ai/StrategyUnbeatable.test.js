import StrategyUnbeatable from './StrategyUnbeatable'
import { MARKER_O, MARKER_X } from '../constants'

it('should pick a winning move', async () => {
  const board = [
    MARKER_X,
    undefined,
    MARKER_X,
    MARKER_O,
    MARKER_O,
    MARKER_X,
    MARKER_O,
    undefined,
    MARKER_O,
  ]
  const strategy = new StrategyUnbeatable()
  const bestMove = await strategy.determineMove(board, MARKER_X)
  expect(bestMove).toBe(1)
})
