import { RichMenu } from '@line/bot-sdk'

export const richmenuData1: RichMenu = {
  size: {
    width: 1200,
    height: 400
  },
  selected: true,
  name: 'リッチメニュー',
  chatBarText: '注文&マイページはこちら👇',
  areas: [
    {
      bounds: {
        x: 0,
        y: 0,
        width: 300,
        height: 400
      },
      action: {
        type: 'postback',
        text: '商品一覧を見る',
        data: 'products'
      }
    },
    {
      bounds: {
        x: 301,
        y: 0,
        width: 300,
        height: 400
      },
      action: {
        type: 'postback',
        text: '注文履歴&マイページを見る',
        data: 'mypage'
      }
    },
    {
      bounds: {
        x: 601,
        y: 0,
        width: 300,
        height: 400
      },
      action: {
        type: 'uri',
        uri: 'https://yoshinani.dev'
      }
    },
    {
      bounds: {
        x: 901,
        y: 0,
        width: 300,
        height: 400
      },
      action: {
        type: 'uri',
        uri: 'https://twitter.com/hyodoblog'
      }
    }
  ]
}
