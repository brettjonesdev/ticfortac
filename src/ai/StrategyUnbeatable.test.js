import { getChildren, minimax } from './StrategyUnbeatable'
import { MARKER_O, MARKER_X } from '../constants'

it('should build tree of all possible moves', () => {
  const board = []
  const topNode = {
    board: [],
    children: getChildren(board, MARKER_X),
  }
  expect(topNode.children.length).toBe(9)
  expect(topNode.children[0].children.length).toBe(8)
  expect(topNode.children[0].children[0].children.length).toBe(7)
  expect(topNode.children[0].children[0].children[0].children.length).toBe(6)
})

it('should pick a winning move', () => {
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
  const children = getChildren(board, MARKER_X)
  expect(children.length).toBe(2)
  expect(children[0].board).toEqual([
    MARKER_X,
    MARKER_X,
    MARKER_X,
    MARKER_O,
    MARKER_O,
    MARKER_X,
    MARKER_O,
    undefined,
    MARKER_O,
  ])
  const scores = children.map((node) => minimax(node, true))
  expect(scores).toEqual([Infinity, 0])
})
