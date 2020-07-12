import Strategy from './Strategy'

class StrategyUnbeatable extends Strategy {
  determineMove(board, marker) {
    let iterativeMove = 0
    while (!board[iterativeMove]) {
      iterativeMove++
    }
    return iterativeMove
  }
}
StrategyUnbeatable.label = 'Expert'

export default StrategyUnbeatable
