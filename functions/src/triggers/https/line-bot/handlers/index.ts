import { WebhookEvent } from '@line/bot-sdk'
import { lineClient } from '~/utils/line'
import { msgError } from '~/triggers/https/line-bot/notice-messages/error'

import { followHandler } from './follow'
import { messagesHandler } from './messages'
import { errorLogger } from '~/utils/util'

export const handlers = async (event: WebhookEvent): Promise<void> => {
  try {
    switch (event.type) {
      case 'follow':
        return await followHandler(event)
      case 'message':
        return await messagesHandler(event)
    }
  } catch (err) {
    lineClient.pushMessage(event.source.userId!, msgError).catch
    errorLogger(err)
    throw new Error('handlers')
  }
}
