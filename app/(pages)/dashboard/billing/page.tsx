import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { getStripeSession, stripe } from '@/app/lib/stripe'
import { redirect } from 'next/navigation'
import { PortalButton } from '@/components/SubmitButtons'
import { getUserById } from '@/app/lib/getUserById'
import { getSubscriptionData } from '@/app/lib/getSubscriptionData'

const featureItems = [
  { name: 'Unlimited note storage' },
  { name: 'Advanced customization' },
  { name: 'Integrations with other tools' },
  { name: 'Real time synchronization' },
  { name: 'Priority support' }
]

export default async function BillingPage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const dbUser = await getUserById(user?.id as string)
  const dbSubscription = await getSubscriptionData(user?.id as string)

  async function createSubscription() {
    'use server'

    if (!dbUser?.stripeCustomerId) {
      throw new Error('Unable to get customer id')
    }

    const subscriptionUrl = await getStripeSession({
      customerId: dbUser.stripeCustomerId,
      domainUrl: process.env.STRIPE_DOMAIN_URL as string,
      priceId: process.env.STRIPE_PRICE_ID as string
    })

    return redirect(subscriptionUrl)
  }

  async function createCustomerPortal () {
    'use server'

    const session = await stripe.billingPortal.sessions.create({
      customer: dbSubscription?.user.stripeCustomerId as string,
      return_url: process.env.STRIPE_REDIRECT_URL as string
    })

    return redirect(session.url)
  }

  if (dbSubscription?.status === 'active') {
    return (
      <div className='grid items-start gap-8'>
        <div className='flex items-center justify-between px-2'>
          <div className='grid gap-1'>
            <h1 className='text-3xl md:text-4xl'>Subscription</h1>
            <p className='text-lg text-muted-foreground'>
              Settings regarding your subscription
            </p>
          </div>
        </div>

        <Card className='w-full lg:w-2/3'>
          <CardHeader>
            <CardTitle>Edit Subscription</CardTitle>
            <CardDescription>
              Click on the button below, this will give you the opportunity to change your payment details and view your statement at the same time.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form action={createCustomerPortal}>
              <PortalButton />
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className='max-w-md mx-auto space-y-4'>
      <Card className='flex flex-col'>
        <CardContent className='py-8'>
          <div>
            <h3 className='inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary'>
              Monthly
            </h3>
          </div>

          <div className='mt-4 flex items-baseline text-6xl font-extrabold'>
            $30 <span className='ml-1 text-2xl text-muted-foreground'>/mo</span>
          </div>
          <p className='mt-5 text-lg text-muted-foreground'>
            Write as many notes as you want for $30 a Month
          </p>
        </CardContent>
        <div className='flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 sm:pt-6'>
          <ul className='space-y-4'>
            {featureItems.map((item, index) => (
              <li key={index} className='flex items-center'>
                <div className='flex-shrink-0'>
                  <CheckCircle2 className='size-6 text-green-500' />
                </div>
                <p className='ml-3 text-base'>{item.name}</p>
              </li>
            ))}
          </ul>

          <form className='w-full' action={createSubscription}>
            <PortalButton />
          </form>
        </div>
      </Card>
    </div>
  )
}