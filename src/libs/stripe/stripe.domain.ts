import type { Stripe } from 'stripe'
import { stripeClient } from './stripe.client'
import { lineClient } from '~/libs/line/line.client'

// customers

export const getCustomer = async (userId: string): Promise<Stripe.Customer> => {
  const { data } = await stripeClient.customers.search({ query: `metadata['userId']:'${userId}'` })
  if (data.length === 0) {
    const lineProfile = await lineClient.getProfile(userId)
    return await stripeClient.customers.create({
      name: lineProfile.displayName || '未設定',
      description: userId,
      metadata: {
        userId
      }
    })
  } else {
    return data[0]
  }
}

// products

export const getProducts = async (): Promise<Stripe.Product[]> => {
  const { data } = await stripeClient.products.list()
  return data
}

// prices

export const getPricesByProductId = async (productId: string): Promise<Stripe.Price[]> => {
  const { data } = await stripeClient.prices.search({ query: `product: '${productId}'` })
  return data
}
