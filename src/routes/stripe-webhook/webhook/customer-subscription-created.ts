import { Stripe } from 'stripe'
import { msgPurchaseComplete } from '~/notice-messages/purchase-complete'
import { lineClient } from '~/clients/line.client'
import { stripeClient } from '~/clients/stripe.client'

interface ReqObj {
  customer: string
}

export default async (event: Stripe.Event): Promise<void> => {
  try {
    const data = event.data.object as ReqObj
    const stripeCustomerId = data.customer

    const customer = await stripeClient.customers.retrieve(stripeCustomerId)
    if (!customer.deleted) {
      const { description: userId } = customer
      await lineClient.pushMessage(userId!, msgPurchaseComplete)
    }

    console.info('customer.subscription.created')
  } catch (err) {
    console.error('customer.subscription.created')
    console.error(err)
    throw Error
  }
}
