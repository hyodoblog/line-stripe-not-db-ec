import { PostbackEvent } from '@line/bot-sdk'
import Stripe from 'stripe'
import { errorLogger } from '~/utils/util'
import { postbackMypageHandler } from './mypage'
import { postbackProductsHandler } from './products'

export const postbackHandler = async (event: PostbackEvent): Promise<void> => {
  try {
    const { data } = event.postback
    switch (data) {
      case 'products':
        return await postbackProductsHandler(event)
      case 'mypage':
        return await postbackMypageHandler(event)
    }

    if (data.includes('products_')) {
      const [, productType, priceId] = data.split('_') as [any, Stripe.Product.Type, string]
      console.info(productType, priceId)
      switch (productType) {
        case 'good':
          return
        case 'service':
          return
      }
    }
  } catch (err) {
    errorLogger(err)
    throw new Error('postback handler')
  }
}
