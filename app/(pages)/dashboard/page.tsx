import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { getNoteData } from '@/app/lib/getNoteData'
import { Edit, File } from 'lucide-react'
import { Card } from '@/components/ui/card'
import prisma from '@/app/lib/db'
import { revalidatePath } from 'next/cache'
import { DeleteButton } from '@/components/SubmitButtons'

export default async function DashboardPage () {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const data = await getNoteData(user?.id as string)

  async function deleteNote(formData: FormData) {
    'use server'

    const noteId = formData.get('noteId') as string

    await prisma.note.delete({
      where: {
        id: noteId
      }
    })

    revalidatePath('/dashboard')
  }

  return (
    <div className='grid items-start gap-y-8'>
      <div className='flex items-center justify-between px-2'>
        <div className='grid gap-1'>
          <h1 className='text-3xl md:text-4xl'>Your Notes</h1>
          <p className='text-lg text-muted-foreground'>
            Here you can see and create new notes
          </p>
        </div>

        {data?.Subscription?.status === 'active'
          ? (
            <Button asChild>
              <Link href='/dashboard/new'>
                Create a new Note
              </Link>
            </Button>
            )
          : (
            <Button asChild>
              <Link href='/dashboard/billing'>
                Create a new Note
              </Link>
            </Button>
            )}
      </div>

      {data?.Notes.length === 0
        ? (
          <div className='flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50'>
            <div className='flex size-20 items-center justify-center rounded-full bg-primary/10'>
              <File className='size-10 text-primary' />
            </div>

            <h2 className='mt-6 text-xl font-semibold'>
              Your don't have any notes created
            </h2>
            <p className='mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto'>
              You currently don't have any notes. Please create some to that you can see them right here.
            </p>

            {data?.Subscription?.status === 'active'
              ? (
                <Button asChild>
                  <Link href='/dashboard/new'>
                    Create a new Note
                  </Link>
                </Button>
                )
              : (
                <Button asChild>
                  <Link href='/dashboard/billing'>
                    Create a new Note
                  </Link>
                </Button>
                )}
          </div>
          )
        : (
          <div className='flex flex-col gap-y-4'>
            {data?.Notes.map((item) => (
              <Card key={item.id} className='flex items-center justify-between p-4'>
                <div>
                  <h2 className='font-semibold text-xl text-primary'>{item.title}</h2>
                  <p className='text-sm'>{new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'full'
                  }).format(new Date(item.createdAt))}
                  </p>
                </div>

                <div className='flex gap-x-4'>
                  <Link href={`/dashboard/new/${item.id}`}>
                    <Button variant='outline' size='icon'>
                      <Edit className='size-4' />
                    </Button>
                  </Link>

                  <form action={deleteNote}>
                    <input type='hidden' name='noteId' value={item.id} />
                    <DeleteButton />
                  </form>
                </div>
              </Card>
            ))}
          </div>
          )}
    </div>
  )
}
