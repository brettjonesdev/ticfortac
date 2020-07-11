import { AI, MARKER_O, MARKER_X, PLAYER, CATS_GAME } from '../constants'

export const winConditions = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 6, 8],
  //diagonal
  [0, 4, 8],
  [2, 4, 6],
]

/**
 * Is the game over, ignoring win conditions. I.e. have all moves been made
 * @param board
 * @return {boolean|boolean}
 */
export const isOver = (board) =>
  board.length === 9 && !board.some((value) => !value)

/**
 * Return the game outcome, or undefined if game is incomplete
 * @param board
 * @return {string}
 */
export const determineOutcome = (board) => {
  for (let i = 0; i < winConditions.length; i++) {
    const winCondition = winConditions[i]
    let xWin = true
    let oWin = true
    // Check that all 3 indices have the same marker
    winCondition.forEach((index) => {
      xWin = xWin && board[index] === MARKER_X
      oWin = oWin && board[index] === MARKER_O
    })
    if (xWin) return MARKER_X
    if (oWin) return MARKER_O
  }
  if (isOver(board)) {
    return CATS_GAME
  }
}

export const opposingMarker = (marker) => {
  return marker === MARKER_X ? MARKER_O : MARKER_X
}

export const opposingPlayer = (player) => {
  return player === PLAYER ? AI : PLAYER
}

/**
 * Make a randomized move
 * @param board
 * @return {number}
 */
export const randomMove = (board) => {
  let randomMove = Math.floor(Math.random() * 9)

  while (board[randomMove]) {
    randomMove = Math.floor(Math.random() * 9)
  }
  return randomMove
}
