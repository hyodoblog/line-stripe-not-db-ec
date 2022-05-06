import { FlexBubble, FlexMessage } from '@line/bot-sdk'

export interface MsgProduct {
  name: string
  imgUrl: string
  description: string
  goodAmount: number
  serviceAmount: number
  goodPriceId: string
  servicePriceId: string
}

export const msgProduct = (product: MsgProduct): FlexMessage => {
  const contents: FlexBubble = {
    type: 'bubble',
    size: 'giga',
    direction: 'ltr',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: product.name,
          align: 'center'
        }
      ]
    },
    hero: {
      type: 'image',
      url: product.imgUrl,
      size: 'full',
      aspectRatio: '1.51:1',
      aspectMode: 'fit'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'spacer',
          size: 'xxl'
        },
        {
          type: 'text',
          text: product.description,
          align: 'start',
          wrap: true
        },
        {
          type: 'spacer',
          size: 'xxl'
        }
      ]
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      spacing: 'lg',
      margin: 'md',
      contents: [
        {
          type: 'button',
          action: {
            type: 'postback',
            label: '今すぐ購入する',
            displayText: '今すぐ購入する',
            data: `products_good_${product.goodPriceId}`
          },
          style: 'primary'
        },
        {
          type: 'button',
          action: {
            type: 'postback',
            label: '詳細を見る',
            displayText: '詳細を見る。',
            data: `products_service_${product.servicePriceId}`
          },
          style: 'secondary'
        }
      ]
    }
  }

  return {
    type: 'flex',
    altText: '商品詳細を見る',
    contents
  }
}
