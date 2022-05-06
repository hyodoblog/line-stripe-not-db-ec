import { TextMessage } from '@line/bot-sdk'

export const msgPurchaseCancel: TextMessage = {
  type: 'text',
  text: '定期購入プランがキャンセルされました。\nまたのご利用お待ちしてます！'
}
