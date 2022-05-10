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

export const getInvoiceUrl = async (customerId: string, priceId: string): Promise<string> => {
  await stripe.invoiceItems.create({ customer: customerId, price: priceId })
  const { id: invoiceId } = await stripe.invoices.create({
    customer: customerId,
    payment_settings: { payment_method_types: ['card', 'konbini'] },
    collection_method: 'send_invoice',
    days_until_due: 7
  })
  await stripe.invoices.sendInvoice(invoiceId)
  const { hosted_invoice_url } = await stripe.invoices.retrieve(invoiceId)

  return hosted_invoice_url!
}
