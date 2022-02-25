import { NextApiResponse } from 'next'
import { withIronSession } from 'next-iron-session'
import dbClient from '../../../lib/dbClient'
import { sessionOpts, SessionUser, NextIronRequest } from '../../../lib/session'

async function handler(req: NextIronRequest, res: NextApiResponse<string[] | false>): Promise<void> {
  const sessUser = req.session.get<SessionUser>('user')
  if (!sessUser) {
    return res.json(false)
  }
  const user = dbClient.getUser(sessUser.id)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(res.json(['User accepted ur invitation', 'Remember to put up the flag today for: Name']))
    }, 3000)
  })
}

export default withIronSession(handler, sessionOpts)
