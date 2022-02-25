import { NextApiRequest, NextApiResponse } from 'next'
import * as webPush from 'web-push'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  webPush.setVapidDetails('localhost', process.env.NEXT_PUBLIC_PUSH_PUBLIC, process.env.PUSH_PRIVATE)
  webPush.sendNotification(pushSubscription, 'Your Push Payload Text');
}
