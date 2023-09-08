import { Stripe } from 'stripe'
import { msgPurchaseCancel } from '~/notice-messages/purchase-cancel'
import { lineClient } from '~/libs/line/line.client'
import { stripeClient } from '~/libs/stripe/stripe.client'

interface ReqObj {
  customer: string
}

export default async (event: Stripe.Event): Promise<void> => {
  try {
    const { customer: customerId } = event.data.object as ReqObj

    const customer = await stripe.customers.retrieve(customerId)
    if (!customer.deleted) {
      const { description: userId } = customer
      await lineClient.pushMessage(userId!, msgPurchaseCancel)
    }

    console.info('customer.subscription.deleted')
  } catch (err) {
    console.error('customer.subscription.deleted')
    console.error(err)
    throw Error
  }
}
