import { NextApiResponse } from 'next'
import { withIronSession } from 'next-iron-session'
import dbClient from '../../../lib/dbClient'
import { sessionOpts, SessionUser, NextIronRequest } from '../../../lib/session'

async function handler(req: NextIronRequest, res: NextApiResponse): Promise<void> {
  const sessUser = req.session.get<SessionUser>('user')
  console.log(`sessUser`, sessUser)
  if (!sessUser) {
    return res.json(false)
  }
  const user = dbClient.getUser(sessUser.id)

  return res.json({ ...user, password: undefined })
}

export default withIronSession(handler, sessionOpts)
