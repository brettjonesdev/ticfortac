import React, { useState, createContext, useCallback } from 'react'

const GameContext = createContext()

export const MARKER_X = 'x'
export const MARKER_O = 'o'

export const PLAYER_TURN = 'PLAYER_TURN'
export const AI_TURN = 'AI_TURN'

export const GameProvider = ({ children }) => {
  const [board, setBoard] = useState([])
  const [turn, setTurn] = useState(PLAYER_TURN)
  const [marker, setMarker] = useState(MARKER_X)

  const toggleMarker = useCallback(() => {
    setMarker(marker === MARKER_X ? MARKER_O : MARKER_X)
  }, [marker])
  const makeMove = useCallback(
    (position) => {
      const newBoard = [...board]
      newBoard[position] = marker
      setBoard(newBoard)
      toggleMarker()
    },
    [board, marker, toggleMarker]
  )
  const newGame = useCallback(() => {
    setBoard([])
    setTurn(PLAYER_TURN)
  }, [])

  const value = { board, makeMove, newGame, turn, setTurn }
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export default GameContext
