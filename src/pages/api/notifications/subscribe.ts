import { NextApiResponse } from 'next'
import { withIronSession } from 'next-iron-session'
import dbClient from '../../../lib/dbClient'
import * as webPush from 'web-push'
import { sessionOpts, SessionUser, NextIronRequest } from '../../../lib/session'

async function handler(req: NextIronRequest, res: NextApiResponse<string[] | false>): Promise<void> {
  // const sessUser = req.session.get<SessionUser>('user')
  // if (!sessUser) {
  //   return res.status(401).json(false)
  // }
  // const user = dbClient.getUser(sessUser.id)
  console.log(`req.body`, req.body)
  webPush.setVapidDetails('http://localhost', process.env.NEXT_PUBLIC_PUSH_PUBLIC, process.env.PUSH_PRIVATE)

  setTimeout(() => {
    console.log(`pushing....`)
    webPush.sendNotification(req.body.pushSub, 'Hello from push notifications')
  }, 2000)

  return res.status(201).send(false)
}

export default withIronSession(handler, sessionOpts)
