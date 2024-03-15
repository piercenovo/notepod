'use client'

import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

export function SubmitButton() {
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

export function SubscriptionCreationButton() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending
        ? (
          <Button disabled className='w-full'>
            <Loader2 className='mr-2 size-4 animate-spin' /> Please Wait
          </Button>
          )
        : (
          <Button className='w-full' type='submit'>
            Create Subscription
          </Button>
          )}
    </>
  )
}

export function PortalButton() {
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
          <Button className='w-fit' type='submit'>
            View payment details
          </Button>
          )}
    </>
  )
}
