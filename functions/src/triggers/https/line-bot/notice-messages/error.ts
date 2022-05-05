import { FlexMessage } from '@line/bot-sdk'

export const msgError: FlexMessage = {
  type: 'flex',
  altText: 'アクセスが集中しているため、少し時間をおいてください...',
  contents: {
    type: 'bubble',
    direction: 'ltr',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'アクセスが集中しているため、少し時間をおいてください...',
          align: 'start',
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
            label: '導入を検討したい方はこちら',
            uri: 'https://yoshinani.dev'
          },
          style: 'primary'
        }
      ]
    }
  }
}
