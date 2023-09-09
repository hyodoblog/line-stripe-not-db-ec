import { PostbackEvent } from '@line/bot-sdk'
import { errorConsole } from '~/utils/util'
import { postbackProductsDetailHandler } from './detail'
import { postbackProductsListHandler } from './list'

export const postbackProductsHandler = async (event: PostbackEvent): Promise<void> => {
  try {
    const { data } = event.postback

    if (data === 'products') {
      return await postbackProductsListHandler(event)
    } else if (data.includes('products.')) {
      const [, productType, priceId] = data.split('.')
      switch (productType) {
        case 'detail':
          return await postbackProductsDetailHandler(event, priceId)
      }
    }
  } catch (err) {
    errorConsole(err)
    throw new Error('postback products handler')
  }
}
