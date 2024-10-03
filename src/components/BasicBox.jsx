import { useRef, useState } from 'react'
import { produce } from 'immer'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ChangeToInput from '@/components/ChangeToInput'

export default function BasicBox({ title }) {
  const inputRef = useRef()
  const [item, setItem] = useState([])

  function addTodo() {
    console.log(inputRef.current.value)
    setItem((prev) => [...prev, inputRef.current.value])
  }
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index)
  }
  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    const draggedIndex = e.dataTransfer.getData('text')

    const currentItems = [...item]

    const draggedItem = currentItems.splice(draggedIndex, 1)
    currentItems.splice(dropIndex, 0, draggedItem)
    setItem(currentItems)
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
            {item?.map((each, index) => {
              return (
                <>
                  <Card
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
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
