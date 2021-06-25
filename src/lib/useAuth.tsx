import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

export default function useUser(redirectTo?: string) {
  const { data: user, mutate: mutateUser } = useSWR('/api/auth/user')

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return

    // If redirectTo is set, redirect if the user was not found.
    if (redirectTo && !user) {
      Router.push(redirectTo)
    }
  }, [user, redirectTo])

  return { user, mutateUser }
}
