import { determineOutcome, opposingMarker, randomMove } from '../logic'
import { getMoves, sleep } from './utils'

export class StrategyBeatable {
  static title = 'Intermediate'
  async determineMove(board, marker) {
    await sleep(1000)
    let winningMove, blockingMove
    const moves = getMoves(board)
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
