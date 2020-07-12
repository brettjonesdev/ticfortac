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
  makeMove as makeMoveAction,
  newGame as newGameAction,
  setFirstMove as setFirstMoveAction,
} from './game'

const GameContext = createContext()

export const GameProvider = ({ children }) => {
  const { strategy } = useContext(StrategyContext)
  const [state, dispatch] = useReducer(gameReducer, undefined, initialState)
  const timeoutId = useRef()
  console.log(state)

  const makeMove = useCallback((position) => {
    dispatch(makeMoveAction(position))
  }, [])

  const newGame = (...args) => dispatch(newGameAction(...args))
  const setFirstMove = (turn) => dispatch(setFirstMoveAction(turn))

  const makeAiMove = useCallback(() => {
    makeMove(strategy.determineMove(state.board, state.marker))
  }, [makeMove, strategy, state])

  useEffect(() => {
    if (!state.outcome && state.turn === AI) {
      timeoutId.current = setTimeout(makeAiMove, 1000)
    }
    return () => clearTimeout(timeoutId.current)
  }, [state, makeAiMove])

  const value = { ...state, makeMove, newGame, setFirstMove }
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export default GameContext
