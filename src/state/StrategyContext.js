import React, { createContext, useEffect, useState } from 'react'
import { strategies, getByName } from '../ai'

const StrategyContext = createContext()

const defaultStrategyName = localStorage.getItem('ai-strategy')
const Strategy = getByName(defaultStrategyName)

export const StrategyProvider = ({ children }) => {
  const [strategy, setStrategy] = useState(new Strategy())
  useEffect(() => {
    localStorage.setItem('ai-strategy', strategy.constructor.name)
  }, [strategy])

  return (
    <StrategyContext.Provider value={{ strategy, setStrategy, strategies }}>
      {children}
    </StrategyContext.Provider>
  )
}

export default StrategyContext
