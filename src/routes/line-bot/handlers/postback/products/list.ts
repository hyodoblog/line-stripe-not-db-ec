import { PostbackEvent } from '@line/bot-sdk'
import { lineClient } from '~/clients/line.client'
import { errorConsole } from '~/utils/util'
import { MsgProductList, msgProducts } from '~/notice-messages/products'
import { getProducts } from '~/domains/product.domain'
import { stripeClient } from '~/clients/stripe.client'

export const postbackProductsListHandler = async (event: PostbackEvent): Promise<void> => {
  try {
    const products = await getProducts()

    const _products: MsgProductList[] = []

    await Promise.all(
      products.map(async (product) => {
        if (typeof product.default_price !== 'string') {
          return
        }

        const price = await stripeClient.prices.retrieve(product.default_price)
        _products.push({
          productId: product.id,
          priceId: price.id,
          name: product.name,
          imgUrl: product.images[0],
          amount: Number(price.unit_amount)
        })
      })
    )

    await lineClient.replyMessage(event.replyToken, msgProducts(_products))
  } catch (err) {
    errorConsole(err)
    throw new Error('postback products list handler')
  }
}
