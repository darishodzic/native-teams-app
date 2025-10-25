import React, { createContext, useState } from 'react'
import { Balance } from '../utils/types'

type AppContextType = {
  selectedBalance?: Balance
  setSelectedBalance: (newBalance: Balance) => void
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedBalance, setSelectedBalance] = useState<Balance>()

  return <AppContext.Provider value={{ selectedBalance, setSelectedBalance }}>{children}</AppContext.Provider>
}
