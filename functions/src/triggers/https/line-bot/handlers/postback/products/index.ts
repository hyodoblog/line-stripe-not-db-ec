import { PostbackEvent } from '@line/bot-sdk'
import { errorLogger } from '~/utils/util'
import { postbackProductsDetailHandler } from './detail'
import { postbackProductsListHandler } from './list'

export const postbackProductsHandler = async (event: PostbackEvent): Promise<void> => {
  try {
    const { data } = event.postback

    if (data === 'products') {
      return await postbackProductsListHandler(event)
    } else if (data.includes('products_')) {
      const [, productType, id] = data.split('_')
      switch (productType) {
        case 'good':
          return
        case 'service':
          return
        case 'detail':
          return await postbackProductsDetailHandler(event, id)
      }
    }
  } catch (err) {
    errorLogger(err)
    throw new Error('postback products handler')
  }
}
