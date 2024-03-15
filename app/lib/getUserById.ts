import prisma from '@/app/lib/db'

export async function getUserById(userId: string) {
  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        name: true,
        email: true,
        colorScheme: true
      }
    })
    return user
  }
}
