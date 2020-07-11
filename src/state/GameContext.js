import React, { createContext, useCallback, useState } from 'react'
import { determineOutcome, opposingMarker, opposingPlayer } from '../logic'
import { MARKER_X } from '../constants'

const GameContext = createContext()

export const GameProvider = ({ children }) => {
  const [board, setBoard] = useState([])
  const [turn, setTurn] = useState(undefined)
  const [marker, setMarker] = useState(MARKER_X)
  const [outcome, setOutcome] = useState(undefined)

  const makeMove = useCallback(
    (position) => {
      const newBoard = [...board]
      newBoard[position] = marker
      setBoard(newBoard)
      const victorMarker = determineOutcome(newBoard)
      if (victorMarker) {
        setOutcome(turn)
      } else {
        setMarker(opposingMarker(marker))
        setTurn(opposingPlayer(turn))
      }
    },
    [board, marker, turn]
  )
  const newGame = useCallback(() => {
    setBoard([])
    setTurn(undefined)
    setOutcome(undefined)
    setMarker(MARKER_X)
  }, [])

  const value = { board, makeMove, newGame, turn, setTurn, outcome }
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export default GameContext
