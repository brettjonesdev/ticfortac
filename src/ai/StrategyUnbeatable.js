import { determineOutcome, opposingMarker } from '../logic'
import { CATS_GAME, MARKER_O, MARKER_X } from '../constants'
import { getMoves, sleep } from './utils'

export function getChildren(board, marker) {
  const moves = getMoves(board)
  if (!moves.length) {
    return []
  }
  return moves.map((move) => {
    const child = [...board]
    child[move] = marker
    return {
      board: child,
      children: getChildren(child, opposingMarker(marker)),
    }
  })
}

function getScore(board) {
  const outcome = determineOutcome(board)
  if (outcome === CATS_GAME) return 0
  if (outcome === MARKER_X) return Infinity
  if (outcome === MARKER_O) return -Infinity
  return null
}

export function minimax(node, maximizingPlayer) {
  if (!node.children.length) {
    return getScore(node.board)
  }

  if (maximizingPlayer) {
    let value = -Infinity
    node.children.forEach((child) => {
      value = Math.max(value, minimax(child, false))
    })
    return value
  } else {
    let value = Infinity
    node.children.forEach((child) => {
      value = Math.min(value, minimax(child, true))
    })
    return value
  }
}

export class StrategyUnbeatable {
  static title = 'Expert'
  //async determineMove(board, marker) {
  //  await sleep(1)
  determineMove(board, marker) {
    const children = getChildren(board, marker)
    const maximizingPlayer = marker === MARKER_X
    let bestScore = maximizingPlayer ? -Infinity : Infinity
    let bestChild = children[0]

    children.forEach((node) => {
      const score = minimax(node, maximizingPlayer)
      if (maximizingPlayer) {
        if (score > bestScore) {
          bestScore = score
          bestChild = node
        }
      } else {
        if (score < bestScore) {
          bestScore = score
          bestChild = node
        }
      }
    })
    // We have the whole board, find the index that changed since that's the move we need to return
    const moveIndex = bestChild.board.findIndex(
      (value, index) => value !== board[index]
    )
    return moveIndex
  }
}

export default StrategyUnbeatable
