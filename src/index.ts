import './alias'
import express from 'express'
import lineBotRouter from './routes/line-bot'
import stripeWebhookRouter from './routes/stripe-webhook'

const app = express()
const port = 5001

app.use(lineBotRouter)
app.use(stripeWebhookRouter)

app.listen(port, () => {
  console.info(`App listening at http://localhost:${port}`)
})
