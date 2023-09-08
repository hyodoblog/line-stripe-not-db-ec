import { PostbackEvent } from '@line/bot-sdk'
import { lineClient } from '~/clients/line.client'
import { errorConsole } from '~/utils/util'
import { msgPurchase } from '~/notice-messages/purchase'
import { LINE_FRIEND_URL } from '~/utils/secrets'
import { stripeClient } from '~/clients/stripe.client'
import { getCustomer } from '~/domains/customer.domain'

const purchase = async (customerId: string, priceId: string): Promise<{ url: string }> => {
  const { url } = await stripeClient.checkout.sessions.create({
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

  if (url === null) {
    throw new Error('url is null')
  }

  return { url }
}

export const postbackProductsServiceHandler = async (event: PostbackEvent, priceId: string): Promise<void> => {
  try {
    const customer = await getCustomer(event.source.userId!)
    const { url } = await purchase(customer.id, priceId)

    await lineClient.replyMessage(event.replyToken, msgPurchase(url))
  } catch (err) {
    errorConsole(err)
    throw new Error('postback products service handler')
  }
}
