import Stripe from 'stripe'
import { stripeClient } from '~/clients/stripe.client'

export const getProducts = async (): Promise<Stripe.Product[]> => {
  const { data } = await stripeClient.products.list()
  return data
}
