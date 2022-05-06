import { logger } from 'firebase-functions'
import { Stripe } from 'stripe'
import { msgPurchaseCancel } from '~/notice-messages/purchase-cancel'
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
      await lineClient.pushMessage(userId!, msgPurchaseCancel)
    }

    logger.info('customer.subscription.deleted')
  } catch (err) {
    logger.error('customer.subscription.deleted')
    logger.error(err)
    throw Error
  }
}
