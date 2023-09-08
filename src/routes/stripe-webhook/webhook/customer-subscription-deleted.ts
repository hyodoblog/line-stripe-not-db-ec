import { Stripe } from 'stripe'
import { msgPurchaseCancel } from '~/notice-messages/purchase-cancel'
import { lineClient } from '~/clients/line.client'
import { stripeClient } from '~/clients/stripe.client'

interface ReqObj {
  customer: string
}

export default async (event: Stripe.Event): Promise<void> => {
  try {
    const { customer: customerId } = event.data.object as ReqObj

    const customer = await stripeClient.customers.retrieve(customerId)
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
