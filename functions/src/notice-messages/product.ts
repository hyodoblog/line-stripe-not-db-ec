import { FlexBubble, FlexComponent, FlexMessage } from '@line/bot-sdk'

export interface MsgProduct {
  name: string
  imgUrl: string
  description: string
  goodAmount: number | null
  serviceAmount: number | null
  goodPriceId: string | null
  servicePriceId: string | null
}

export const msgProduct = (product: MsgProduct): FlexMessage => {
  const footerContents: FlexComponent[] = []
  if (product.goodPriceId !== null && product.goodAmount !== null) {
    footerContents.push({
      type: 'button',
      action: {
        type: 'postback',
        label: `今すぐ購入する(¥${Number(product.goodAmount).toLocaleString()})`,
        text: '今すぐ購入する。',
        data: `products.good.${product.goodPriceId}`
      },
      style: 'primary'
    })
  }
  if (product.servicePriceId !== null && product.serviceAmount !== null) {
    footerContents.push({
      type: 'button',
      action: {
        type: 'postback',
        label: `定期購入する(¥${Number(product.serviceAmount).toLocaleString()})`,
        text: '定期購入する。',
        data: `products.service.${product.servicePriceId}`
      },
      style: 'primary'
    })
  }

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
      spacing: 'md',
      margin: 'md',
      contents: footerContents
    }
  }

  return {
    type: 'flex',
    altText: '商品詳細を見る',
    contents
  }
}
