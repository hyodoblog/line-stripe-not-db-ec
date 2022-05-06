import { PostbackEvent } from '@line/bot-sdk'
import { lineClient } from '~/utils/line'
import { stripe } from '~/utils/stripe'
import { errorLogger } from '~/utils/util'
import { msgProduct, MsgProduct } from '~line/notice-messages/product'

export const postbackProductsDetailHandler = async (event: PostbackEvent, productId: string): Promise<void> => {
  try {
    const _product = await stripe.products.retrieve(productId)
    const product: MsgProduct = {
      name: _product.name,
      imgUrl: _product.images[0],
      description: _product.description || '説明がありません。',
      goodAmount: 0,
      serviceAmount: 0,
      goodPriceId: '',
      servicePriceId: ''
    }

    await lineClient.replyMessage(event.replyToken, msgProduct(product))
  } catch (err) {
    errorLogger(err)
    throw new Error('postback products detail handler')
  }
}
