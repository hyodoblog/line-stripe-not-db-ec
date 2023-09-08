import { WebhookEvent } from '@line/bot-sdk'
import { lineClient } from '~/utils/line'
import { msgError } from '~/notice-messages/error'

import { followHandler } from './follow'
import { errorLogger } from '~/utils/util'
import { postbackHandler } from './postback'

export const handlers = async (event: WebhookEvent): Promise<void> => {
  try {
    switch (event.type) {
      case 'follow':
        return await followHandler(event)
      case 'postback':
        return await postbackHandler(event)
    }
  } catch (err) {
    lineClient.pushMessage(event.source.userId!, msgError).catch
    errorLogger(err)
    throw new Error('handlers')
  }
}
