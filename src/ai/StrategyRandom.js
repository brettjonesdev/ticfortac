import { randomMove } from '../logic'
import Strategy from './Strategy'

export class StrategyRandom extends Strategy {
  static title = 'Novice'
  findBestMove(board, marker) {
    return randomMove(board)
  }
}

export default StrategyRandom
