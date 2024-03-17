'use client'

import { useFormStatus } from 'react-dom'
import { Loader2, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

export function SubscriptionButton() {
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

export function DeleteButton() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending
        ? (
          <Button variant='destructive' size='icon' type='submit'>
            <Loader2 className='size-4 animate-spin' />
          </Button>
          )
        : (
          <Button variant='destructive' size='icon' type='submit'>
            <Trash className='size-4' />
          </Button>
          )}
    </>
  )
}
