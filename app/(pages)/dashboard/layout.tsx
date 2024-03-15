import { DashboardNav } from '@/components/DashboardNav'
import { ReactNode } from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { getUserData } from '@/app/lib/getUserData'

export default async function DashboardLayout({ children } : {children: ReactNode}) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    return redirect('/')
  }

  await getUserData({
    email: user.email as string,
    firstName: user.given_name as string,
    id: user.id as string,
    lastName: user.family_name as string,
    profileImage: user.picture
  })

  return (
    <div className='flex flex-col space-y-6 mt-10'>
      <div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
        <aside className='hidden w-[200px] flex-col md:flex'>
          <DashboardNav />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  )
}
