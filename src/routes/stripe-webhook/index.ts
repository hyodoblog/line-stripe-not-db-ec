import { Request, Response, json, urlencoded, raw, Router } from 'express'

import signatureMiddleware from './middleware/signature.middleware'
import customerSubscriptionCreated from './webhook/customer-subscription-created'
import customerSubscriptionDeleted from './webhook/customer-subscription-deleted'
import invoicePayment_succeeded from './webhook/invoice-payment_succeeded'

const router = Router()

// *********
// 関数群
// *********

const handler = async (req: Request, res: Response) => {
  try {
    const event = signatureMiddleware(req)

    switch (event.type) {
      case 'customer.subscription.created':
        await customerSubscriptionCreated(event)
        break
      case 'customer.subscription.deleted':
        await customerSubscriptionDeleted(event)
        break
      case 'invoice.payment_succeeded':
        await invoicePayment_succeeded(event)
        break
      default:
        throw new Error('stripe event type is not found.')
    }
    res.status(200).send('success').end()
  } catch (err) {
    console.error(err)
    res.status(404).end()
  }
}

const rawBodySaver = function (req: Request, _: Response, buf: Buffer, encoding: string) {
  if (buf && buf.length) {
    // @ts-ignore
    req.rawBody = buf.toString(encoding || 'utf8')
  }
}

router.use(json({ verify: rawBodySaver }))
router.use(urlencoded({ verify: rawBodySaver, extended: true }))
router.use(raw({ verify: rawBodySaver, type: '*/*' }))
router.post('/', handler)

export default router
