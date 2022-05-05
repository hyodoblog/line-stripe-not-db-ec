import Stripe from 'stripe'
import { STRIPE_SECRET_KEY } from '~/utils/secrets'

export const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' })

// customers

export const getCustomer = async (userId: string): Promise<Stripe.Customer | null> => {
  const { data } = await stripe.customers.search({ query: `metadata['userId']:'${userId}'` })
  return data.length === 0 ? null : data[0]
}

export const createCustomer = async (userId: string): Promise<void> => {
  await stripe.customers.create({
    description: userId,
    metadata: {
      userId
    }
  })
}

// products

export const getProducts = async (): Promise<Stripe.Product[]> => {
  const { data } = await stripe.products.list()
  return data
}
