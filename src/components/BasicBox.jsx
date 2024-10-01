import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ChangeToInput from '@/components/ChangeToInput'

export default function BasicBox() {
  const inputRef = useRef()
  const [content, setContent] = useState([])

  function addTodo() {
    console.log(inputRef.current.value)
    setContent((prev) => [...prev, inputRef.current.value])
  }

  return (
    <>
      <Card className='flex-col min-w-96 min-h-96'>
        <CardHeader>
          <CardTitle>To Do</CardTitle>
        </CardHeader>
        <CardDescription>
          <ChangeToInput event={addTodo} reference={inputRef} />
          {content?.map((each, index) => {
            return (
              <>
                <Card
                  className='h-10 w-4/5 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium'
                  key={index}
                >
                  {each}
                </Card>
              </>
            )
          })}
        </CardDescription>
      </Card>
    </>
  )
}
