import { createContext, useContext, useState } from 'react'

const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
  const [fetch, setFetch] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const globalStates = {
    fetch,
    setFetch,
    search,
    setSearch,
    selected,
    setSelected
  }

  return (
    <GlobalContext.Provider value={{ globalStates }}>
        {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext)
