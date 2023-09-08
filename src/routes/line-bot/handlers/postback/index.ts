import { PostbackEvent } from '@line/bot-sdk'
import { errorConsole } from '~/utils/util'
import { postbackMypageHandler } from './mypage'
import { postbackProductsHandler } from './products'

export const postbackHandler = async (event: PostbackEvent): Promise<void> => {
  try {
    const { data } = event.postback
    if (data.includes('products')) {
      return await postbackProductsHandler(event)
    } else if (data === 'mypage') {
      return await postbackMypageHandler(event)
    }
  } catch (err) {
    errorConsole(err)
    throw new Error('postback handler')
  }
}
