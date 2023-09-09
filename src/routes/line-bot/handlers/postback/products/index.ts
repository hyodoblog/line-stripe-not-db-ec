import { PostbackEvent } from '@line/bot-sdk'
import { errorConsole } from '~/utils/util'
import { postbackProductsListHandler } from './list'

export const postbackProductsHandler = async (event: PostbackEvent): Promise<void> => {
  try {
    const { data } = event.postback

    if (data === 'products') {
      return await postbackProductsListHandler(event)
    }
  } catch (err) {
    errorConsole(err)
    throw new Error('postback products handler')
  }
}
