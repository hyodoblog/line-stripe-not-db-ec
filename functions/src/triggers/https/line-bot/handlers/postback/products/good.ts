import { PostbackEvent } from '@line/bot-sdk'
import { lineClient } from '~/utils/line'
import { getCustomer, getInvoiceUrl } from '~/utils/stripe'
import { errorLogger } from '~/utils/util'
import { msgPurchase } from '~/notice-messages/purchase'

export const postbackProductsGoodHandler = async (event: PostbackEvent, priceId: string): Promise<void> => {
  try {
    const customer = await getCustomer(event.source.userId!)
    const url = await getInvoiceUrl(customer.id, priceId)

    await lineClient.replyMessage(event.replyToken, msgPurchase(url))
  } catch (err) {
    errorLogger(err)
    throw new Error('postback products good handler')
  }
}
