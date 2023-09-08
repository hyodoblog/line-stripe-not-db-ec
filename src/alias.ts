import { join } from 'path'
import moduleAlias from 'module-alias'

moduleAlias.addAliases({
  '~': join(__dirname, './'),
  '~lineBot': join(__dirname, './routes/line-bot'),
  '~stripeWebhook': join(__dirname, './routes/stripe-webhook')
})
