import prisma from '@/app/lib/db'

export async function getSubscriptionData(userId: string) {
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
