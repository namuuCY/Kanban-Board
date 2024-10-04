import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'

export default function EditableCard({ children, reference, event }) {
  const [edit, setEdit] = useState(false)
  const editTextRef = useRef()

  return (
    <>
      {edit ? (
        <Input
          ref={reference}
          onKeyDown={(e) => {
            if (e.code === 'Enter' && e.nativeEvent.isComposing === false) {
              event()
              setEdit(!edit)
            }
          }}
          defaultValue={children}
        ></Input>
      ) : (
        <>
          <Card ref={reference}>{children}</Card>
          <Button
            onClick={(e) => {
              setEdit(!edit)
            }}
          >
            EDIT
          </Button>
          <Button variant='outline' size='icon'>
            ❌
          </Button>
        </>
      )}
    </>
  )
}
