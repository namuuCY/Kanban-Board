import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'

export default function EditableCard({
  children,
  editEvent,
  removeEvent,
  reference,
  index,
  draggable,
  onDragStart,
  onDragOver,
}) {
  const [edit, setEdit] = useState(false)

  return (
    <>
      {edit ? (
        <Input
          ref={reference}
          onKeyDown={(e) => {
            if (e.code === 'Enter' && e.nativeEvent.isComposing === false) {
              setEdit(!edit)
              editEvent(reference, index)
            }
          }}
          defaultValue={children}
        ></Input>
      ) : (
        <>
          <Card
            className='flex justify-between items-center m-2 h-10 w-4/5 whitespace-nowrap rounded-md text-sm font-medium'
            draggable={draggable}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
          >
            <span className='ml-2'>{children}</span>

            <div className='flex items-center mr-1'>
              <Button
                variant='outline'
                size='sm'
                className='text-xs'
                onClick={(e) => {
                  setEdit(!edit)
                }}
              >
                EDIT
              </Button>
              <Button
                variant='outline'
                size='icon'
                className='text-xs'
                onClick={(e) => removeEvent(index)}
              >
                ❌
              </Button>
            </div>
          </Card>
        </>
      )}
    </>
  )
}
