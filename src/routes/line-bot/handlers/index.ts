import { WebhookEvent } from '@line/bot-sdk'
import { lineClient } from '~/clients/line.client'
import { msgError } from '~/notice-messages/error'

import { followHandler } from './follow'
import { errorConsole } from '~/utils/util'
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
    errorConsole(err)
    throw new Error('handlers')
  }
}
