import { CATS_GAME, MARKER_O } from '../constants'
import { determineOutcome, opposingMarker, opposingPlayer } from '../logic'

export const MAKE_MOVE = 'MAKE_MOVE'
export const NEW_GAME = 'NEW_GAME'
export const SET_TURN = 'SET_TURN'

export const initialState = () => ({
  board: [],
  turn: undefined,
  marker: MARKER_O,
  outcome: undefined,
})

export const makeMove = (position) => {
  return {
    type: MAKE_MOVE,
    position,
  }
}
export const newGame = () => {
  return {
    type: NEW_GAME,
  }
}
export const setFirstMove = (player) => {
  return {
    type: SET_TURN,
    turn: player,
  }
}

export const gameReducer = (state = initialState(), action = {}) => {
  switch (action.type) {
    case MAKE_MOVE:
      const result = { ...state }
      const { board, turn, marker } = result
      const { position } = action
      const newMarker = opposingMarker(marker)
      board[position] = newMarker
      const markerOutcome = determineOutcome(board)
      if (markerOutcome) {
        result.outcome =
          // determineOutcome returns the winning Marker, we want to share the winning *player*
          markerOutcome === CATS_GAME ? markerOutcome : state.turn
      }
      result.marker = newMarker
      result.turn = opposingPlayer(turn)
      return result
    case NEW_GAME:
      return initialState()
    case SET_TURN:
      return { ...state, turn: action.turn }
    default:
      return state
  }
}
