import { PostbackEvent } from '@line/bot-sdk'
import Stripe from 'stripe'
import { lineClient } from '~/utils/line'
import { getPricesByProductId, stripe } from '~/utils/stripe'
import { errorConsole } from '~/utils/util'
import { msgProduct, MsgProduct } from '~/notice-messages/product'

const getGoogItemByPrices = (
  prices: Stripe.Price[]
): { goodPriceId: string | null; goodPriceAmount: number | null } => {
  const price = prices.filter((price) => price.type === 'one_time')[0]
  if (price === undefined) {
    return { goodPriceId: null, goodPriceAmount: null }
  } else {
    return { goodPriceId: price.id, goodPriceAmount: price.unit_amount }
  }
}

const getServiceItemByPrices = (
  prices: Stripe.Price[]
): { servicePriceId: string | null; servicePriceAmount: number | null } => {
  const price = prices.filter((price) => price.type === 'recurring')[0]
  if (price === undefined) {
    return { servicePriceId: null, servicePriceAmount: null }
  } else {
    return { servicePriceId: price.id, servicePriceAmount: price.unit_amount }
  }
}

export const postbackProductsDetailHandler = async (event: PostbackEvent, productId: string): Promise<void> => {
  try {
    const _product = await stripe.products.retrieve(productId)
    const prices = await getPricesByProductId(productId)
    const goodItem = getGoogItemByPrices(prices)
    const serviceItem = getServiceItemByPrices(prices)

    const product: MsgProduct = {
      name: _product.name,
      imgUrl: _product.images[0],
      description: _product.description || '説明がありません。',
      goodAmount: goodItem.goodPriceAmount,
      serviceAmount: serviceItem.servicePriceAmount,
      goodPriceId: goodItem.goodPriceId,
      servicePriceId: serviceItem.servicePriceId
    }

    await lineClient.replyMessage(event.replyToken, msgProduct(product))
  } catch (err) {
    errorConsole(err)
    throw new Error('postback products detail handler')
  }
}
