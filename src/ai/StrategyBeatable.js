import Strategy from './Strategy'
import { randomMove } from '../logic'

class StrategyBeatable extends Strategy {
  determineMove(board) {
    return randomMove(board)
  }
}
StrategyBeatable.label = 'Novice'

export default StrategyBeatable
