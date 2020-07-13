export const sleep = async (ms) => new Promise((r) => setTimeout(() => r(), ms))

export const getAvailableMoveIndices = (board) => {
  const moves = []
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      moves.push(i)
    }
  }
  return moves
}
