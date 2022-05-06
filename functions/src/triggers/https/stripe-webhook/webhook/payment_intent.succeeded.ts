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
    const { customer: customerId } = event.data.object as ReqObj

    const customer = await stripe.customers.retrieve(customerId)
    if (!customer.deleted) {
      const { description: userId } = customer
      await lineClient.pushMessage(userId!, msgPurchaseComplete)
    }

    logger.info('payment_intent.succeeded')
  } catch (err) {
    logger.error('payment_intent.succeeded')
    logger.error(err)
    throw Error
  }
}
