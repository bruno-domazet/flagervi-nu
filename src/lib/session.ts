import { NextApiRequest } from 'next'
import { Session, SessionOptions } from 'next-iron-session'
export const sessionOpts: SessionOptions = {
  // secrets rotation, just prepend new secret to array
  password: [{ id: 1, password: process.env.SECRET }],
  cookieName: process.env.COOKIE_NAME,
  ttl: (parseInt(process.env.COOKIE_TTL, 10) || 30) * 8600, // seconds to days
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export interface SessionUser {
  id: string
}
export type NextIronRequest = NextApiRequest & { session: Session }
