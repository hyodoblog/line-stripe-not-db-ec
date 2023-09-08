import { Request } from 'express'
import { stripe } from '~/utils/stripe'
import { STRIPE_WEBHOOK_SECRET } from '~/utils/secrets'
import { Stripe } from 'stripe'

export default (req: Request): Stripe.Event => {
  const signature = req.headers['stripe-signature']
  if (!signature || typeof signature !== 'string') throw new Error('stripe signature is not found.')
  // @ts-ignore
  const body = req.rawBody

  return stripe.webhooks.constructEvent(body as string, signature, STRIPE_WEBHOOK_SECRET)
}
