import './alias'
import express from 'express'
import lineBotRouter from './routes/line-bot'

const app = express()
const port = 5001

app.use(lineBotRouter)

app.listen(port, () => {
  console.info(`App listening at http://localhost:${port}`)
})
