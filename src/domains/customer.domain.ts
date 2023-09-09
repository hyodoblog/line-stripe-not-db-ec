import Stripe from 'stripe'
import { lineClient } from '~/clients/line.client'
import { stripeClient } from '~/clients/stripe.client'

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
