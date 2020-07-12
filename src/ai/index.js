import StrategyBeatable from './StrategyBeatable'
import StrategyUnbeatable from './StrategyUnbeatable'

export const strategies = [StrategyBeatable, StrategyUnbeatable]
export const getByName = (name) => {
  const match = strategies.find((Strategy) => Strategy.name === name)
  return match || StrategyBeatable
}
