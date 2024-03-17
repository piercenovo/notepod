import Link from 'next/link'
import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/UserNav'

export async function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <nav className='border-b bg-background h-[10vh] flex items-center'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <h1 className='font-bold text-2xl'>
            Note<span className='text-primary'>pod</span>
          </h1>
        </Link>

        <div className='flex items-center gap-x-5'>
          <ThemeToggle />

          {(await isAuthenticated())
            ? (
              <UserNav
                email={user?.email as string}
                image={user?.picture as string}
                name={user?.given_name as string}
              />
              )
            : (
              <div className='flex items-center gap-x-5'>
                <LoginLink>
                  <Button>Sign In</Button>
                </LoginLink>
                <RegisterLink>
                  <Button variant='secondary'>Sign Up</Button>
                </RegisterLink>
              </div>
              )}
        </div>
      </div>
    </nav>
  )
}
