'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { navItems } from '@/components/UserNav'

export function DashboardNav() {
  const pathname = usePathname()
  console.log(pathname)

  return (
    <nav className='grid items-start gap-2'>
      {navItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <span className={cn(
            'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
            pathname === item.href ? 'bg-accent' : 'bg-transparent'
          )}
          >
            <item.icon className='mr-2 size-4 text-primary' />
            <span>{item.name}</span>
          </span>
        </Link>
      ))}
    </nav>
  )
}
