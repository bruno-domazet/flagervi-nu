import { NextApiResponse } from 'next'
import { withIronSession } from 'next-iron-session'
import { sessionOpts, NextIronRequest } from '../../../lib/session'

async function handler(req: NextIronRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    return res.status(405).json(false)
  }
  res.setHeader('cache-control', ['no-store', 'max-age=0'])
  req.session.destroy()
  return res.json(true)
}

export default withIronSession(handler, sessionOpts)
