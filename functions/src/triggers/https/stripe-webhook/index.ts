import express, { Request, Response, json, urlencoded, raw } from 'express'
import { logger, region, RuntimeOptions } from 'firebase-functions'

import signatureMiddleware from './middleware/signature.middleware'
import customerSubscriptionCreated from './webhook/customer-subscription-created'
import paymentIntentSucceeded from './webhook/payment_intent.succeeded'

const app = express()

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
      case 'payment_intent.succeeded':
        await paymentIntentSucceeded(event)
        break
      default:
        throw new Error('stripe event type is not found.')
    }
    res.status(200).send('success').end()
  } catch (err) {
    logger.error(err)
    res.status(404).end()
  }
}

const rawBodySaver = function (req: Request, _: Response, buf: Buffer, encoding: string) {
  if (buf && buf.length) {
    // @ts-ignore
    req.rawBody = buf.toString(encoding || 'utf8')
  }
}

app.use(json({ verify: rawBodySaver }))
app.use(urlencoded({ verify: rawBodySaver, extended: true }))
app.use(raw({ verify: rawBodySaver, type: '*/*' }))
app.post('/', handler)

// *************
// Functions設定

const runtimeOpts: RuntimeOptions = {
  timeoutSeconds: 540,
  memory: '1GB'
}

module.exports = region('asia-northeast1').runWith(runtimeOpts).https.onRequest(app)
