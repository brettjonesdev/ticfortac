import { sleep } from './utils'

const MINIMUM_WAIT_TIME = 1000

class Strategy {
  async determineMove(board, marker) {
    const start = new Date()
    const bestMove = this.findBestMove(board, marker)
    const end = new Date()
    const duration = end - start
    // Wait for a minimum of 1 second to give the impression of the computer "thinking"
    const waitTime = Math.max(MINIMUM_WAIT_TIME - duration, 1)
    await sleep(waitTime)
    return bestMove
  }
  findBestMove(board, marker) {}
}

export default Strategy
