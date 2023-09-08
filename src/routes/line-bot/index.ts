import { middleware } from '@line/bot-sdk'
import { Router } from 'express'
import { errorConsole } from '~/utils/util'
import { handlers } from './handlers'
import { lineMiddlewareConfig } from '~/clients/line.client'

const router = Router()

router.post('/line-bot', middleware(lineMiddlewareConfig), (req, res) =>
  Promise.all(req.body.events.map(handlers))
    .then(() => {
      res.status(200).end()
    })
    .catch((err) => {
      errorConsole(err)
      res.status(500).end()
    })
)

export default router
