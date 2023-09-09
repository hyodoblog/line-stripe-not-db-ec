import { PostbackEvent } from '@line/bot-sdk'
import { errorConsole } from '~/utils/util'
import { postbackProductsHandler } from './products'

export const postbackHandler = async (event: PostbackEvent): Promise<void> => {
  try {
    const { data } = event.postback
    if (data.includes('products')) {
      return await postbackProductsHandler(event)
    }
  } catch (err) {
    errorConsole(err)
    throw new Error('postback handler')
  }
}
