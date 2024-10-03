import { useState, useContext, createContext } from 'react'
import '@/App.css'
import BasicBox from '@/components/BasicBox'

const TotalContext = createContext({})

function App() {
  const [lists, setLists] = useState({
    0: [],
    1: [],
    2: [],
  })
  return (
    <TotalContext.Provider value={{ lists, setLists }}>
      <div className='flex'>
        <BasicBox title={'To Do'} />
        <BasicBox title={'In Progress'} />
        <BasicBox title={'Done'} />
      </div>
    </TotalContext.Provider>
  )
}

export default App
