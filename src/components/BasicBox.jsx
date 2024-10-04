import { useRef, useState, useContext } from 'react'
import { TotalContext } from '@/App'
import { produce } from 'immer'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ChangeToInput from '@/components/ChangeToInput'
import EditableCard from '@/components/EditableCard'

export default function BasicBox({ title, listIndex }) {
  const inputRef = useRef()
  const boxRef = useRef()
  const { lists, setLists } = useContext(TotalContext)

  function addTodo() {
    const inputTodo = inputRef.current.value
    if (inputTodo.length !== 0) {
      const changed = produce(lists, (draft) => {
        draft[listIndex] = [...draft[listIndex], inputTodo]
      })
      setLists(changed)
    }
  }

  const handleDragStart = (e, index, prevListIndex) => {
    const prev = { prevListIndex, prevItemIndex: index }
    e.dataTransfer.clearData()
    e.dataTransfer.setData('object', JSON.stringify(prev))
  }

  const handleDrop = (e, nextListIndex) => {
    e.preventDefault()
    const currentY = e.clientY
    const childList = boxRef.current.childNodes
    const Ylist = []
    childList.forEach((each) => {
      const box = each.getBoundingClientRect()
      Ylist.push(box.top + box.height / 2)
    })
    Ylist.push(currentY)
    Ylist.sort()
    const dropIndex = Ylist.indexOf(currentY)

    const prev = JSON.parse(e.dataTransfer.getData('object'))

    const draggedList = produce(lists, (draft) => {
      const [temp] = draft[prev.prevListIndex].splice(prev.prevItemIndex, 1)
      draft[nextListIndex].splice(dropIndex, 0, temp)
    })
    setLists(draggedList)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Card className='flex flex-col min-w-80 min-h-96 m-4'>
        <CardHeader className='flex flex-col items-center'>
          <CardTitle className='mb-4'>{title}</CardTitle>
          <ChangeToInput event={addTodo} reference={inputRef} />
        </CardHeader>

        <Card
          className='flex flex-col items-center m-2 min-h-80'
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, listIndex)}
          ref={boxRef}
        >
          {lists[listIndex].map((each, index) => {
            return (
              <>
                <Card
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, index, listIndex)}
                  onDragOver={handleDragOver}
                  className='flex justify-around items-center m-2 h-10 w-4/5 whitespace-nowrap rounded-md text-sm font-medium'
                  key={index}
                >
                  {each}
                  <Button variant='outline' size='sm'>
                    EDIT
                  </Button>
                </Card>
              </>
            )
          })}
          {/* <EditableCard event={addTodo} reference={inputRef}>
            테스트중
          </EditableCard> */}
        </Card>
      </Card>
    </>
  )
}
