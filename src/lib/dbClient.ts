import { PrismaClient } from '@prisma/client'

class DbClient extends PrismaClient {
  protected baseUserInfo = {
    id: true,
    password: true,
    email: true,
    name: true,
    createdAt: true,
    emailVerifiedAt: true,
  }
  constructor() {
    super({ rejectOnNotFound: true })
  }

  private sanitizeEmail(email: string) {
    return email.replace(/_/g, '\\_').toLowerCase()
  }

  getUserByEmail(email: string) {
    return this.user.findUnique({
      select: this.baseUserInfo,
      where: {
        email: this.sanitizeEmail(email),
      },
    })
  }
  getUser(id: string) {
    return this.user.findUnique({
      select: this.baseUserInfo,
      where: { id },
    })
  }

  createUser(email: string, passwordHash: string) {
    return this.user.create({
      data: { email: this.sanitizeEmail(email), password: passwordHash },
      select: this.baseUserInfo,
    })
  }
}
const dbClient = new DbClient()

export default dbClient
