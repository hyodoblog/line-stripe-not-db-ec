import Stripe from 'stripe'
import { LINE_FRIEND_URL, STRIPE_SECRET_KEY } from '~/utils/secrets'
import { lineClient } from './line'

export const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' })

// customers

export const getCustomer = async (userId: string): Promise<Stripe.Customer> => {
  const { data } = await stripe.customers.search({ query: `metadata['userId']:'${userId}'` })
  if (data.length === 0) {
    const lineProfile = await lineClient.getProfile(userId)
    return await stripe.customers.create({
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
  const { data } = await stripe.products.list()
  return data
}

// prices

export const getPricesByProductId = async (productId: string): Promise<Stripe.Price[]> => {
  const { data } = await stripe.prices.search({ query: `product: '${productId}'` })
  return data
}
