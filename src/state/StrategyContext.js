import React, { createContext, useState } from 'react'
import StrategyBeatable from '../ai/StrategyBeatable'
import StrategyUnbeatable from '../ai/StrategyUnbeatable'

const StrategyContext = createContext()

const strategies = [StrategyBeatable, StrategyUnbeatable]
export const StrategyProvider = ({ children }) => {
  const [strategy, setStrategy] = useState(new StrategyBeatable())

  return (
    <StrategyContext.Provider value={{ strategy, setStrategy, strategies }}>
      {children}
    </StrategyContext.Provider>
  )
}

export default StrategyContext
