import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import { AI } from '../constants'
import StrategyContext from './StrategyContext'
import {
  gameReducer,
  initialState,
  makeMove,
  newGame as newGameAction,
  setFirstMove as setFirstMoveAction,
} from './game'

const GameContext = createContext()

export const GameProvider = ({ children }) => {
  const { strategy } = useContext(StrategyContext)
  const timeoutId = useRef()
  const [state, dispatch] = useReducer(gameReducer, undefined, initialState)

  const newGame = (...args) => dispatch(newGameAction(...args))
  const setFirstMove = (turn) => dispatch(setFirstMoveAction(turn))

  const makeAiMove = useCallback(() => {
    const move = strategy.determineMove(state.board, state.upNextMarker)
    dispatch(makeMove(move))
  }, [strategy, state])

  useEffect(() => {
    if (!state.outcome && state.turn === AI) {
      timeoutId.current = setTimeout(makeAiMove, 1000)
    }
    return () => clearTimeout(timeoutId.current)
  }, [state, makeAiMove])

  const value = {
    ...state,
    makeMove: (position) => dispatch(makeMove(position)),
    newGame,
    setFirstMove,
  }
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export default GameContext
