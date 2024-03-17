import { getNoteById } from '@/app/lib/getNoteById'
import { SubmitButton } from '@/components/SubmitButtons'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import prisma from '@/app/lib/db'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export default async function DynamicRoute({ params }: {params: {id: string}}) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const data = await getNoteById({ userId: user?.id as string, noteId: params.id })

  async function postData(formData: FormData) {
    'use server'

    if (!user) {
      throw new Error('You are not allowed')
    }

    const title = formData.get('title') as string
    const description = formData.get('description') as string

    await prisma.note.update({
      where: {
        id: data?.id,
        userId: user?.id
      },
      data: {
        title,
        description
      }
    })

    revalidatePath('/dashboard')

    return redirect('/dashboard')
  }
  return (
    <Card>
      <form action={postData}>
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
          <CardDescription>
            Right here you can now edit your notes
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-y-5'>
          <div className='gap-y-2 flex flex-col'>
            <Label>Title</Label>
            <Input
              required
              type='text'
              name='title'
              placeholder='Title for your note'
              defaultValue={data?.title}
            />
          </div>

          <div className='gap-y-2 flex flex-col'>
            <Label>Description</Label>
            <Textarea
              required
              name='description'
              placeholder='Describe your note as you want'
              defaultValue={data?.description}
            />
          </div>
        </CardContent>

        <CardFooter className='flex justify-between'>
          <Button asChild variant='destructive'>
            <Link href='/dashboard'>Cancel</Link>
          </Button>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  )
}
