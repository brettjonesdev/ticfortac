import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
import { findWinningPositions } from '../logic'

const GameContext = createContext()

export const GameProvider = ({ children }) => {
  const { strategy } = useContext(StrategyContext)
  const gameCount = useRef(0)
  const [state, dispatch] = useReducer(gameReducer, undefined, initialState)

  const newGame = (...args) => {
    dispatch(newGameAction(...args))
    gameCount.current++
  }
  const setFirstMove = (turn) => dispatch(setFirstMoveAction(turn))

  const makeAiMove = useCallback(async () => {
    const game = gameCount.current
    const move = await strategy.determineMove(state.board, state.upNextMarker)
    if (gameCount.current === game) {
      dispatch(makeMove(move))
    }
  }, [strategy, state])

  useEffect(() => {
    if (!state.outcome && state.turn === AI) {
      makeAiMove()
    }
  }, [state, makeAiMove])
  const winningPositions = useMemo(() => findWinningPositions(state.board), [
    state,
  ])

  const value = {
    ...state,
    makeMove: (position) => dispatch(makeMove(position)),
    newGame,
    setFirstMove,
    winningPositions,
  }
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export default GameContext
