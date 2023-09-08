import { Request } from 'express'
import { stripeClient } from '~/libs/stripe/stripe.client'
import { STRIPE_WEBHOOK_SECRET } from '~/utils/secrets'
import type { Stripe } from 'stripe'

export default (req: Request): Stripe.Event => {
  const signature = req.headers['stripe-signature']
  if (!signature || typeof signature !== 'string') throw new Error('stripe signature is not found.')
  // @ts-ignore
  const body = req.rawBody

  return stripeClient.webhooks.constructEvent(body as string, signature, STRIPE_WEBHOOK_SECRET)
}
