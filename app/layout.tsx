import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/Navbar'
import { getUserById } from './lib/getUserById'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600']
})

export const metadata: Metadata = {
  title: 'Notepod',
  description: 'Optimize your workflow with Notepod, the SAAS note app designed to simplify the management of your ideas and projects. Where you can capture, organize and share your notes efficiently.'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const data = await getUserById(user?.id as string)
  return (
    <html lang='en'>
      <body className={`${poppins.className} ${data?.colorScheme ?? 'theme-violet'}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
