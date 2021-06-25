import { NextApiResponse } from 'next'
import * as bcrypt from 'bcrypt'
import { withIronSession } from 'next-iron-session'
import dbClient from '../../../lib/dbClient'
import { NotFoundError } from 'prisma'
import { sessionOpts, SessionUser, NextIronRequest } from '../../../lib/session'

async function handler(req: NextIronRequest, res: NextApiResponse): Promise<void> {
  console.log(`req.body`, req.body)
  try {
    // sanitize
    const email = req.body.email.toLowerCase().trim()

    // find or create
    const user = await dbClient.getUserByEmail(email).catch(async err => {
      if (err instanceof NotFoundError) {
        return await dbClient.createUser(email, bcrypt.hashSync(req.body.password, 10))
      } else {
        throw err
      }
    })

    // compare passwords
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json(false)
    }

    // save user.id to session
    req.session.set<SessionUser>('user', {
      id: user.id,
    })
    await req.session.save()

    return res.json({ ...user, password: undefined })
  } catch (err) {
    console.log(`err`, err)
    res.status(500).json({ error: err.message })
  }
}

export default withIronSession(handler, sessionOpts)
