import { FlexBubble, FlexMessage } from '@line/bot-sdk'

export const msgPurchase = (uri: string): FlexMessage => {
  const contents: FlexBubble = {
    type: 'bubble',
    direction: 'ltr',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '有効期限は1時間です。',
          weight: 'regular',
          align: 'center',
          wrap: true
        }
      ]
    },
    footer: {
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'button',
          action: {
            type: 'uri',
            label: '決済ページへ',
            uri
          },
          style: 'primary'
        }
      ]
    },
    styles: {
      header: {
        separator: false
      },
      footer: {
        separator: false
      }
    }
  }

  return {
    type: 'flex',
    altText: '購入リンク',
    contents
  }
}
