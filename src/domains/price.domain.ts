import Stripe from 'stripe'
import { stripeClient } from '~/clients/stripe.client'

export const getPricesByProductId = async (productId: string): Promise<Stripe.Price[]> => {
  const { data } = await stripeClient.prices.search({ query: `product: '${productId}'` })
  return data
}
