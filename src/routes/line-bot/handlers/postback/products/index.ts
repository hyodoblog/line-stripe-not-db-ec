import { PostbackEvent } from '@line/bot-sdk'
import { errorConsole } from '~/utils/util'
import { postbackProductsDetailHandler } from './detail'
import { postbackProductsOneTimeHandler } from './one-time'
import { postbackProductsListHandler } from './list'
import { postbackProductsRegularHandler } from './regular'

export const postbackProductsHandler = async (event: PostbackEvent): Promise<void> => {
  try {
    const { data } = event.postback

    if (data === 'products') {
      return await postbackProductsListHandler(event)
    }

    if (data.includes('products.')) {
      const [, productType, priceId] = data.split('.')
      switch (productType) {
        case 'detail':
          return await postbackProductsDetailHandler(event, priceId)
        case 'one-time':
          return await postbackProductsOneTimeHandler(event, priceId)
        case 'regular':
          return await postbackProductsRegularHandler(event, priceId)
      }
    }
  } catch (err) {
    errorConsole(err)
    throw new Error('postback products handler')
  }
}
