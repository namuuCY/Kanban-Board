import { useState, createContext } from 'react'
import '@/index.css'
import BasicBox from '@/components/BasicBox'

const defaultObject = {
  0: [],
  1: [],
  2: [],
}
const TotalContext = createContext({ lists: defaultObject, setLists: (state) => {} })

function App() {
  const [lists, setLists] = useState({
    0: [],
    1: [],
    2: [],
  })
  return (
    <TotalContext.Provider value={{ lists, setLists }}>
      <div className='flex'>
        <BasicBox title={'To Do'} listIndex={0} />
        <BasicBox title={'In Progress'} listIndex={1} />
        <BasicBox title={'Done'} listIndex={2} />
      </div>
    </TotalContext.Provider>
  )
}

export { App, TotalContext }
