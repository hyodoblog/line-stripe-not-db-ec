import { Stripe } from 'stripe'
import { stripe } from '~/utils/stripe'

interface ReqObj {
  customer: string
}

export default async (event: Stripe.Event): Promise<void> => {
  try {
    const data = event.data.object as ReqObj
    const stripeCustomerId = data.customer

    const customer = await stripe.customers.retrieve(stripeCustomerId)
    console.info(customer)

    console.info('customer.subscription.created')
  } catch (err) {
    console.error('customer.subscription.created')
    console.error(err)
    throw Error
  }
}
