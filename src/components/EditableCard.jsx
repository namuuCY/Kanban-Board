import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'

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
          <ContextMenu className='flex justify-between items-center m-2 h-10 w-4/5 whitespace-nowrap rounded-md text-sm font-medium'>
            <ContextMenuTrigger className='flex justify-between items-center m-2 h-10 w-4/5 whitespace-nowrap rounded-md text-sm font-medium'>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={(e) => {
                    setEdit(!edit)
                  }}
                >
                  Edit to do
                </ContextMenuItem>
                <ContextMenuItem onClick={(e) => removeEvent(index)}>Delete to do </ContextMenuItem>
              </ContextMenuContent>
              <Card
                className='flex justify-between items-center m-2 h-10 w-4/5 whitespace-nowrap rounded-md text-sm font-medium'
                draggable={draggable}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
              >
                <span className='ml-2'>{children}</span>

                {/* <div className='flex items-center mr-1'>
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
                </div> */}
              </Card>
            </ContextMenuTrigger>
          </ContextMenu>
        </>
      )}
    </>
  )
}
