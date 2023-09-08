import { logger } from 'firebase-functions'
import { Stripe } from 'stripe'
import { msgPurchaseComplete } from '~/notice-messages/purchase-complete'
import { lineClient } from '~/utils/line'
import { stripe } from '~/utils/stripe'

interface ReqObj {
  customer: string
}

export default async (event: Stripe.Event): Promise<void> => {
  try {
    const data = event.data.object as ReqObj
    const stripeCustomerId = data.customer

    const customer = await stripe.customers.retrieve(stripeCustomerId)
    if (!customer.deleted) {
      const { description: userId } = customer
      await lineClient.pushMessage(userId!, msgPurchaseComplete)
    }

    logger.info('customer.subscription.created')
  } catch (err) {
    logger.error('customer.subscription.created')
    logger.error(err)
    throw Error
  }
}
