import { middleware } from '@line/bot-sdk'
import { Router } from 'express'
import { lineMiddlewareConfig } from '~/utils/line'
import { errorConsole } from '~/utils/util'
import { handlers } from './handlers'

const router = Router()

router.use()
router.post('/', middleware(lineMiddlewareConfig), (req, res) =>
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
