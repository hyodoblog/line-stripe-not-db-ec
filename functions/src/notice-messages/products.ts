import { FlexBubble, FlexCarousel, FlexMessage } from '@line/bot-sdk'

export interface MsgProductList {
  productId: string
  priceId: string
  name: string
  imgUrl: string
  amount: number
}

export const msgProducts = (products: MsgProductList[]): FlexMessage => {
  const productContents: FlexBubble[] = []

  for (const product of products) {
    productContents.push({
      type: 'bubble',
      size: 'kilo',
      hero: {
        type: 'image',
        url: product.imgUrl,
        size: 'full',
        aspectRatio: '1:1',
        aspectMode: 'cover'
      },
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'text',
            text: product.name,
            weight: 'bold',
            size: 'xl',
            wrap: false
          },
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'text',
                text: `¥${Number(product.amount).toLocaleString()}`,
                weight: 'bold',
                size: 'xl',
                flex: 0,
                wrap: true
              },
              {
                type: 'text',
                text: '(税込)',
                weight: 'bold',
                size: 'sm',
                flex: 0,
                margin: 'md',
                wrap: true
              }
            ]
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        contents: [
          {
            type: 'button',
            action: {
              type: 'postback',
              label: '単体で購入する',
              displayText: '単体で購入する。',
              data: `products.good.${product.priceId}`
            },
            style: 'primary'
          },
          {
            type: 'button',
            action: {
              type: 'postback',
              label: '詳細を見る',
              displayText: '詳細を見る。',
              data: `products.detail.${product.productId}`
            },
            style: 'secondary'
          }
        ]
      }
    })
  }

  const contents: FlexCarousel = {
    type: 'carousel',
    contents: productContents
  }

  return {
    type: 'flex',
    altText: '商品一覧を見る',
    contents
  }
}
