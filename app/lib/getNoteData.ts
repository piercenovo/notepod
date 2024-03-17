import prisma from '@/app/lib/db'
import { unstable_noStore as noStore } from 'next/cache'

export async function getNoteData(userId: string) {
  noStore()
  const data = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      Notes: true,
      Subscription: {
        select: {
          status: true
        }
      }
    }
  })

  return data
}
