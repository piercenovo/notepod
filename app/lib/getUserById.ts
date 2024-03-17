import prisma from '@/app/lib/db'
import { unstable_noStore as noStore } from 'next/cache'

export async function getUserById(userId: string) {
  noStore()
  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        name: true,
        email: true,
        colorScheme: true,
        stripeCustomerId: true
      }
    })
    return user
  }
}
