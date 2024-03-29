import prisma from '@/app/lib/db'
import { unstable_noStore as noStore } from 'next/cache'

export async function getSubscriptionData(userId: string) {
  noStore()
  const data = await prisma.subscription.findUnique({
    where: {
      userId
    },
    select: {
      status: true,
      user: {
        select: {
          stripeCustomerId: true
        }
      }
    }
  })

  return data
}
