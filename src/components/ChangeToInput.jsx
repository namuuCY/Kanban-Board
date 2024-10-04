import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRef, useState } from 'react'

export default function ChangeToInput({ children, event, reference }) {
  const [typed, setTyped] = useState(false)

  return (
    <>
      {typed ? (
        <Input
          className='w-4/5 m-2'
          placeholder={'Input todo'}
          ref={reference}
          onKeyDown={(e) => {
            if (e.code === 'Enter' && e.nativeEvent.isComposing === false) {
              event()
              setTyped(!typed)
            }
          }}
        ></Input>
      ) : (
        <Button
          className='w-4/5 m-2'
          onClick={(e) => {
            setTyped(!typed)
          }}
        >
          Push this button to add TODOS
        </Button>
      )}
    </>
  )
}
