import 'bootstrap/dist/css/bootstrap.css' // own css files here
import './styles.scss'

import Head from 'next/head'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          async registration => {
            let sub: PushSubscription
            sub = await registration.pushManager.getSubscription()
            if (!sub) {
              sub = await registration.pushManager.subscribe({
                applicationServerKey: process.env.NEXT_PUBLIC_PUSH_PUBLIC,
                userVisibleOnly: true,
              })
            }
  
            if (sub) {
              // tell the backend about the subscription
              await fetch('/api/notifications/subscribe', {
                method: 'POST',
                body: JSON.stringify({ pushSub: sub }),
                headers: {
                  'content-type': 'application/json',
                },
              })
            }
          },
          err => {
            console.error('Service Worker registration failed: ', err)
          }
        )
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Flagervinu</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#90cdf4" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
