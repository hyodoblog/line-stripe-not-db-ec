import { PostbackEvent } from '@line/bot-sdk'
import { lineClient } from '~/utils/line'
import { LINE_FRIEND_URL } from '~/utils/secrets'
import { getCustomer, stripe } from '~/utils/stripe'
import { errorLogger } from '~/utils/util'
import { msgMypage } from '~/notice-messages/mypage'

export const postbackMypageHandler = async (event: PostbackEvent): Promise<void> => {
  try {
    const customer = await getCustomer(event.source.userId!)
    const { url } = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: LINE_FRIEND_URL
    })

    await lineClient.replyMessage(event.replyToken, msgMypage(url))
  } catch (err) {
    errorLogger(err)
    throw new Error('postback products handler')
  }
}
