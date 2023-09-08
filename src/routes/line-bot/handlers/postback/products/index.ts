import { PostbackEvent } from '@line/bot-sdk'
import { errorConsole } from '~/utils/util'
import { postbackProductsDetailHandler } from './detail'
import { postbackProductsGoodHandler, postbackProductsOneTimeHandler } from './one-time'
import { postbackProductsListHandler } from './list'
import { postbackProductsServiceHandler } from './service'

export const postbackProductsHandler = async (event: PostbackEvent): Promise<void> => {
  try {
    const { data } = event.postback

    if (data === 'products') {
      return await postbackProductsListHandler(event)
    } else if (data.includes('products.')) {
      const [, productType, priceId] = data.split('.')
      switch (productType) {
        case 'one-time':
          return await postbackProductsOneTimeHandler(event, priceId)
        case 'service':
          return await postbackProductsServiceHandler(event, priceId)
        case 'detail':
          return await postbackProductsDetailHandler(event, priceId)
      }
    }
  } catch (err) {
    errorConsole(err)
    throw new Error('postback products handler')
  }
}
