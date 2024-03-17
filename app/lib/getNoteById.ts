import prisma from '@/app/lib/db'
import { unstable_noStore as noStore } from 'next/cache'

export async function getNoteById({
  userId,
  noteId
}: {
  userId: string
  noteId: string
}) {
  noStore()
  if (userId) {
    const data = await prisma.note.findUnique({
      where: {
        id: noteId,
        userId
      },
      select: {
        title: true,
        description: true,
        id: true
      }
    })
    return data
  }
}
