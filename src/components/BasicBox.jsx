import { useRef, useState, useContext } from 'react'
import { TotalContext } from '@/App'
import { current, produce } from 'immer'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ChangeToInput from '@/components/ChangeToInput'

export default function BasicBox({ title, listIndex }) {
  const inputRef = useRef()
  const { lists, setLists } = useContext(TotalContext)
  const [item, setItem] = useState([])

  function addTodo() {
    const changed = produce(lists, (draft) => {
      draft[listIndex] = [...draft[listIndex], inputRef.current.value]
    })
    setLists(changed)
    console.log(lists)
    setItem((prev) => [...prev, inputRef.current.value])
  }

  const handleDragStart = (e, index, prevListIndex) => {
    const prev = { prevListIndex, prevItemIndex: index }
    e.dataTransfer.clearData()
    e.dataTransfer.setData('text/plain', index)
    e.dataTransfer.setData('object', JSON.stringify(prev))
  }

  const handleDrop = (e, dropIndex, nextListIndex) => {
    e.preventDefault()
    console.log(nextListIndex)
    const draggedIndex = e.dataTransfer.getData('text')
    const prev = JSON.parse(e.dataTransfer.getData('object'))

    const currentItems = [...item]

    const draggedItem = currentItems.splice(draggedIndex, 1)
    currentItems.splice(dropIndex, 0, draggedItem)
    setItem(currentItems)

    // const draggedList = produce(lists, (draft) => {
    //   const temp = draft[prev.prevListIndex][prev.prevItemIndex]
    //   draft[prev.prevListIndex] = draft[prev.prevListIndex].splice(prev.prevItemIndex, 1)
    //   draft[nextListIndex] = draft[nextListIndex].splice(dropIndex, 0, temp)
    // })
    const draggedList = produce(lists, (draft) => {
      // 이전 리스트에서 아이템을 제거
      const [draggedItem] = draft[prev.prevListIndex].splice(prev.prevItemIndex, 1)

      // 새로운 리스트에 아이템 삽입
      draft[nextListIndex].splice(dropIndex, 0, draggedItem)
    })

    setLists(draggedList)
    console.log(lists)
  }
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Card className='flex-col min-w-96 min-h-96'>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        <Card className='flex-col items-center justify-center'>
          <CardDescription className=' items-center justify-center'>
            <ChangeToInput event={addTodo} reference={inputRef} />
            {lists[listIndex].map((each, index) => {
              return (
                <>
                  <Card
                    draggable
                    onDragStart={(e) => handleDragStart(e, index, listIndex)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index, listIndex)}
                    className='m-2 h-10 w-4/5 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium'
                    key={index}
                  >
                    {each}
                  </Card>
                </>
              )
            })}
          </CardDescription>
        </Card>
      </Card>
    </>
  )
}
