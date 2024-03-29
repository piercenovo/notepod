import prisma from '@/app/lib/db'
import { stripe } from '@/app/lib/stripe'
import { unstable_noStore as noStore } from 'next/cache'

export async function getUserData({
  email,
  id,
  firstName,
  lastName,
  profileImage
}: {
  email: string
  id: string
  firstName: string | undefined | null
  lastName: string | undefined | null
  profileImage: string | undefined | null
}) {
  noStore()
  const user = await prisma.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      stripeCustomerId: true
    }
  })

  if (!user) {
    const name = `${firstName ?? ''} ${lastName ?? ''}`
    await prisma.user.create({
      data: {
        id,
        email,
        name
      }
    })
  }

  if (!user?.stripeCustomerId) {
    const data = await stripe.customers.create({
      email
    })

    await prisma.user.update({
      where: {
        id
      },
      data: {
        stripeCustomerId: data.id
      }
    })
  }
}
