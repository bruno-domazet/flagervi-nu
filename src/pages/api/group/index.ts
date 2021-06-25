import { NextApiRequest, NextApiResponse } from 'next'
import dbClient from '../../../lib/dbClient'

// TODO move to a middleware
// const isAuthenticated = async (req: NextApiRequest, res: NextApiResponse) => {
//   const session = await getSession({ req })
//   if (!session) {
//     throw new Error('Unauthenticated')
//   }
//   if (session.expires && new Date(session.expires) < new Date()) {
//     throw new Error('Session expired')
//   }
//   console.log(`session`, session)

//   return session
// }

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await isAuthenticated(req, res)
  console.log(`object`, { method: req.method, user })

  switch (req.method) {
    case 'GET':
      // get a paginated list of groups the user belongs to
      const userObj = await dbClient.getUser(user.user.email)
      // return res.json({ groups: userObj.groups })

      break
    case 'POST':
      // TODO: upsert and return new object
      console.log(`body`, req.body)
      const group = await dbClient.group.create({
        data: {
          name: req.body.name.toString(),
          owner: {
            connectOrCreate: {
              create: { email: user.user.email },
              where: {
                email: user.user.email,
              },
            },
          },
        },
      })
      return res.json({ success: true, group })

    default:
      throw new Error('Method not supported')
  }
}
