export default function usePushNotifications() {
  const handler = () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
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
            await fetch('/subscribe', {
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
    }
  }

  window.addEventListener('load', handler)

  return {
    unload: window.removeEventListener('load', handler),
    sw: '',
  }
}
