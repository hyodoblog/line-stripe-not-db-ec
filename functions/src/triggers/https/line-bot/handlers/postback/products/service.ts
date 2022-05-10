import { PostbackEvent } from '@line/bot-sdk'
import { lineClient } from '~/utils/line'
import { getCustomer, stripe } from '~/utils/stripe'
import { errorLogger } from '~/utils/util'
import { msgPurchase } from '~/notice-messages/purchase'
import { LINE_FRIEND_URL } from '~/utils/secrets'

const purchase = async (customerId: string, priceId: string): Promise<{ url: string }> => {
  const { url } = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    shipping_address_collection: {
      allowed_countries: ['JP']
    },
    mode: 'subscription',
    payment_method_types: ['card'],
    success_url: LINE_FRIEND_URL,
    cancel_url: LINE_FRIEND_URL
  })

  return { url: url! }
}

export const postbackProductsServiceHandler = async (event: PostbackEvent, priceId: string): Promise<void> => {
  try {
    const customer = await getCustomer(event.source.userId!)
    const { url } = await purchase(customer.id, priceId)

    await lineClient.replyMessage(event.replyToken, msgPurchase(url))
  } catch (err) {
    errorLogger(err)
    throw new Error('postback products service handler')
  }
}
