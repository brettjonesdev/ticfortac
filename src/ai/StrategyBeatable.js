import { determineOutcome, opposingMarker, randomMove } from '../logic'
import { getAvailableMoveIndices } from './utils'
import Strategy from './Strategy'

export class StrategyBeatable extends Strategy {
  static title = 'Intermediate'
  findBestMove(board, marker) {
    let winningMove, blockingMove
    const moves = getAvailableMoveIndices(board)
    moves.forEach((move) => {
      const moveBoard = [...board]
      moveBoard[move] = marker
      const outcome = determineOutcome(moveBoard)
      if (outcome === marker) {
        winningMove = move
      }
    })

    moves.forEach((move) => {
      const moveBoard = [...board]
      moveBoard[move] = opposingMarker(marker)
      const outcome = determineOutcome(moveBoard)
      if (outcome === opposingMarker(marker)) {
        blockingMove = move
      }
    })
    if (winningMove !== undefined) return winningMove
    if (blockingMove !== undefined) return blockingMove
    return randomMove(board)
  }
}

export default StrategyBeatable
