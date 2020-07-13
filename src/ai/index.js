import StrategyBeatable from './StrategyBeatable'
import StrategyUnbeatable from './StrategyUnbeatable'
import StrategyRandom from './StrategyRandom'

export const strategies = [StrategyRandom, StrategyBeatable, StrategyUnbeatable]
export const getByName = (name) => {
  const match = strategies.find((Strategy) => Strategy.name === name)
  return match || StrategyBeatable
}
