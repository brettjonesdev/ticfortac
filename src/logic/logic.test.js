import {
  winConditions,
  determineOutcome,
  opposingMarker,
  randomMove,
  isOver,
  findWinningPositions,
} from './index'
import { CATS_GAME, MARKER_O, MARKER_X } from '../constants'

const makeWinningBoard = (winCondition, marker) => {
  const board = []
  winCondition.forEach((index) => {
    board[index] = marker
  })
  // Add a couple of random moves for the other side
  board[randomMove(board)] = opposingMarker(marker)
  board[randomMove(board)] = opposingMarker(marker)
  return board
}

const xWins = winConditions.map((winCondition) =>
  makeWinningBoard(winCondition, MARKER_X)
)

const oWins = winConditions.map((winCondition) =>
  makeWinningBoard(winCondition, MARKER_O)
)

const catBoards = [
  [
    MARKER_O,
    MARKER_X,
    MARKER_O,
    MARKER_O,
    MARKER_X,
    MARKER_O,
    MARKER_X,
    MARKER_O,
    MARKER_X,
  ],
  [
    MARKER_X,
    MARKER_X,
    MARKER_O,
    MARKER_O,
    MARKER_O,
    MARKER_X,
    MARKER_X,
    MARKER_O,
    MARKER_X,
  ],
]

const incomplete = [
  [MARKER_X, undefined, MARKER_X, MARKER_O, MARKER_O],
  [MARKER_O, MARKER_X, undefined, MARKER_X, MARKER_O, MARKER_O, MARKER_X],
]

describe('Game logic tests', () => {
  xWins.forEach((board, index) => {
    it(`should determine an X victory for board ${JSON.stringify(
      board
    )}`, () => {
      expect(determineOutcome(board)).toBe(MARKER_X)
      expect(findWinningPositions(board)).toEqual(winConditions[index])
    })
  })

  oWins.forEach((board, index) => {
    it(`should determine an O victory for board ${JSON.stringify(
      board
    )}`, () => {
      expect(determineOutcome(board)).toBe(MARKER_O)
      expect(findWinningPositions(board)).toEqual(winConditions[index])
    })
  })

  incomplete.forEach((board) =>
    it(`should determine no victor for incomplete board ${JSON.stringify(
      board
    )}`, () => {
      expect(determineOutcome(board)).toBe(undefined)
    })
  )

  catBoards.forEach((board) =>
    it(`should determine no victor for Cat's game ${JSON.stringify(
      board
    )}`, () => {
      expect(determineOutcome(board)).toBe(CATS_GAME)
    })
  )
  it('should detect when game is complete', () => {
    catBoards.forEach((board) => expect(isOver(board)).toBe(true))
    incomplete.forEach((board) => expect(isOver(board)).toBe(false))
  })
})
