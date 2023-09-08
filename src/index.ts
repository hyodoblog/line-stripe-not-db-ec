import './alias'
import express from 'express'
import lineBotRouter from './routes/line-bot'
import stripeWebhookRouter from './routes/stripe-webhook'

const app = express()
const port = 3000

app.post('/line-bot', lineBotRouter)
app.post('/stripe-webhook', stripeWebhookRouter)

app.listen(port, () => {
  console.info(`Example app listening at http://localhost:${port}`)
})
