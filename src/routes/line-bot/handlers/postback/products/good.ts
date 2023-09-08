import { PostbackEvent } from '@line/bot-sdk'
import { lineClient } from '~/utils/line'
import { getCustomer, stripe } from '~/utils/stripe'
import { errorConsole } from '~/utils/util'
import { msgPurchase } from '~/notice-messages/purchase'

const purchase = async (customerId: string, priceId: string): Promise<{ url: string }> => {
  await stripe.invoiceItems.create({ customer: customerId, price: priceId })
  const { id: invoiceId } = await stripe.invoices.create({
    customer: customerId,
    payment_settings: { payment_method_types: ['card', 'konbini'] },
    collection_method: 'send_invoice',
    days_until_due: 7
  })
  await stripe.invoices.sendInvoice(invoiceId)
  const { hosted_invoice_url } = await stripe.invoices.retrieve(invoiceId)

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
