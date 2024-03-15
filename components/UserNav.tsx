import Link from 'next/link'
import { CreditCard, DoorClosed, Home, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem
} from './ui/dropdown-menu'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'

export const navItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard }
]

export function UserNav({ name, email, image } : {name: string, email: string, image: string}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative size-10 rounded-full'>
          <Avatar className='size-10 rounded-full'>
            <AvatarImage src={image} alt={name + 'user avatar'} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{name}</p>
            <p className='text-xs leading-none text-muted-foreground'>{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navItems.map((item, index) => (
            <DropdownMenuItem asChild key={index}>
              <Link
                href={item.href}
                className='w-full flex justify-between items-center'
              >
                {item.name}
                <span><item.icon className='size-4' /> </span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem className='w-full flex justify-between items-center' asChild>
          <LogoutLink>
            Logout{' '}
            <span>
              <DoorClosed className='size-4' />
            </span>
          </LogoutLink>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
