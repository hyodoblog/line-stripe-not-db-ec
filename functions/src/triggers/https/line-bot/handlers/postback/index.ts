import { PostbackEvent } from '@line/bot-sdk'
import { errorLogger } from '~/utils/util'
import { postbackMypageHandler } from './mypage'
import { postbackProductsHandler } from './products'

export const postbackHandler = async (event: PostbackEvent): Promise<void> => {
  try {
    switch (event.postback.data) {
      case 'products':
        return await postbackProductsHandler(event)
      case 'mypage':
        return await postbackMypageHandler(event)
    }
  } catch (err) {
    errorLogger(err)
    throw new Error('postback handler')
  }
}
