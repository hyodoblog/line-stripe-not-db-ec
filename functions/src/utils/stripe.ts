import Stripe from 'stripe'
import { LINE_FRIEND_URL, STRIPE_SECRET_KEY } from '~/utils/secrets'

export const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' })

// customers

export const getCustomer = async (userId: string): Promise<Stripe.Customer> => {
  const { data } = await stripe.customers.search({ query: `metadata['userId']:'${userId}'` })
  if (data.length === 0) {
    return await stripe.customers.create({
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

// purchase

export const getCheckoutSessionUrl = async (
  customerId: string,
  priceId: string,
  productType: Stripe.Product.Type
): Promise<string> => {
  let mode: Stripe.Checkout.Session.Mode
  let payment_method_types: Stripe.Checkout.SessionCreateParams.PaymentMethodType[]
  switch (productType) {
    case 'good':
      mode = 'payment'
      payment_method_types = ['card', 'konbini']
      break
    case 'service':
      mode = 'subscription'
      payment_method_types = ['card']
  }

  const { url } = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    shipping_address_collection: {
      allowed_countries: ['JP']
    },
    mode,
    payment_method_types,
    success_url: LINE_FRIEND_URL,
    cancel_url: LINE_FRIEND_URL
  })

  return url!
}
