'use client'

import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

export default function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending
        ? (
          <Button disabled className='w-fit'>
            <Loader2 className='mr-2 size-4 animate-spin' /> Please Wait
          </Button>
          )
        : (
          <Button className='w-fit' type='submit'>Save Now</Button>
          )}
    </>
  )
}
