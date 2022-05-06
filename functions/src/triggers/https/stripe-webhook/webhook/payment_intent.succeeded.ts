import { Stripe } from 'stripe'
import { lineClient } from '~/utils/line'
import { stripe } from '~/utils/stripe'

interface ReqObj {
  customer: string
}

export default async (event: Stripe.Event): Promise<void> => {
  try {
    const { customer: customerId } = event.data.object as ReqObj

    const customer = await stripe.customers.retrieve(customerId)
    if (!customer.deleted) {
      const { description: userId } = customer
      await lineClient.pushMessage(userId!, [])
    }

    console.info('payment_intent.succeeded')
  } catch (err) {
    console.error('payment_intent.succeeded')
    console.error(err)
    throw Error
  }
}
