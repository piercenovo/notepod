import prisma from '@/app/lib/db'

export async function getData({
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
}
