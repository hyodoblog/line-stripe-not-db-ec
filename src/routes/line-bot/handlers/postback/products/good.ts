import { PostbackEvent } from '@line/bot-sdk'
import { lineClient } from '~/clients/line.client'
import { errorConsole } from '~/utils/util'
import { msgPurchase } from '~/notice-messages/purchase'
import { stripeClient } from '~/clients/stripe.client'
import { getCustomer } from '~/domains/customer.domain'

const purchase = async (customerId: string, priceId: string): Promise<{ url: string }> => {
  await stripeClient.invoiceItems.create({ customer: customerId, price: priceId })
  const { id: invoiceId } = await stripeClient.invoices.create({
    customer: customerId,
    payment_settings: { payment_method_types: ['card', 'konbini'] },
    collection_method: 'send_invoice',
    days_until_due: 7
  })
  await stripeClient.invoices.sendInvoice(invoiceId)
  const { hosted_invoice_url } = await stripeClient.invoices.retrieve(invoiceId)

  return { url: hosted_invoice_url! }
}

export const postbackProductsGoodHandler = async (event: PostbackEvent, priceId: string): Promise<void> => {
  try {
    const customer = await getCustomer(event.source.userId!)
    const { url } = await purchase(customer.id, priceId)

    await lineClient.replyMessage(event.replyToken, msgPurchase(url))
  } catch (err) {
    errorConsole(err)
    throw new Error('postback products good handler')
  }
}
