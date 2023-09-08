import { TextMessage } from '@line/bot-sdk'

export const msgPurchaseComplete: TextMessage = {
  type: 'text',
  text: 'ご注文ありがとうございます。\n定期販売のキャンセルは、リッチメニューのマイページより気軽にできます。'
}
