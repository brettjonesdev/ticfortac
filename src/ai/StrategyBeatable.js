import { randomMove } from '../logic'
import { sleep } from './utils'

export class StrategyBeatable {
  static title = 'Novice'
  async determineMove(board, marker) {
    await sleep(1000)
    return randomMove(board)
  }
}

export default StrategyBeatable
