import { FollowEvent } from '@line/bot-sdk'
import { lineClient } from '~/utils/line'
import { getCustomer } from '~/utils/stripe'
import { msgFollow } from '~/notice-messages/follow'

export const followHandler = async (event: FollowEvent): Promise<void> => {
  const userId = event.source.userId!

  await getCustomer(userId)

  await lineClient.replyMessage(event.replyToken, msgFollow)
}
