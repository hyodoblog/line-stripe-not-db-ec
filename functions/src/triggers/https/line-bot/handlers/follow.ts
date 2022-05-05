import { FollowEvent } from '@line/bot-sdk'
import { lineClient } from '~/utils/line'
import { createCustomer, getCustomer } from '~/utils/stripe'
import { msgFollow } from '~line/notice-messages/follow'

export const followHandler = async (event: FollowEvent): Promise<void> => {
  const userId = event.source.userId!

  const customer = await getCustomer(userId)
  if (customer === null) {
    await createCustomer(userId)
  }

  await lineClient.replyMessage(event.replyToken, msgFollow)
}
