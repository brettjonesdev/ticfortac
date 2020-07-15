import { determineOutcome, opposingMarker } from '../logic'
import { CATS_GAME, MARKER_O, MARKER_X } from '../constants'
import { getAvailableMoveIndices } from './utils'
import Strategy from './Strategy'

function getScore(board) {
  const outcome = determineOutcome(board)
  if (outcome === CATS_GAME) return 0
  if (outcome === MARKER_X) return 100
  if (outcome === MARKER_O) return -100
  return null
}

function minimax(node, marker) {
  const availableIndices = getAvailableMoveIndices(node.board)

  const outcome = determineOutcome(node.board)
  if (outcome || availableIndices.length === 0) {
    const score = getScore(node.board)
    return { score }
  }

  const moves = availableIndices.map((index) => {
    const newBoard = [...node.board]
    newBoard[index] = marker
    const move = {
      index,
      board: newBoard,
    }

    const result = minimax(move, opposingMarker(marker))
    move.score = result.score

    return move
  })

  let bestMove
  if (marker === MARKER_X) {
    let bestScore = -Infinity
    moves.forEach((move) => {
      if (move.score > bestScore) {
        bestScore = move.score
        bestMove = move
      }
    })
  } else {
    let bestScore = Infinity
    moves.forEach((move) => {
      if (move.score < bestScore) {
        bestScore = move.score
        bestMove = move
      }
    })
  }
  return bestMove
}

export class StrategyUnbeatable extends Strategy {
  static title = 'Unbeatable'
  findBestMove(board, marker) {
    const bestMove = minimax({ board }, marker)
    return bestMove.index
  }
}

export default StrategyUnbeatable
