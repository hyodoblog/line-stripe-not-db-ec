import { TextMessage } from '@line/bot-sdk'

export const msgFollow: TextMessage = {
  type: 'text',
  text: '友だち登録ありがとうございます。\n\n配送先や決済情報は事前にマイページから入力しておくとスムーズに注文ができるようになります。\nマイページにアクセスするにはリッチメニューの注文履歴ボタンを押してください。\n\n決済まで試されたい方は以下のテスト用クレジットカードをお使いください。\n番号：4242-4242-4242-4242\n有効期限：4/24\nセキュリティーコード：424'
}
