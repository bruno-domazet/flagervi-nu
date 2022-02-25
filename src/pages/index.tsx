import React from 'react'
import useSWR from 'swr'
import Layout from '../components/layout'
import LoginForm from '../components/loginForm'

export default function HomePage() {
  // const { data } = useSWR<string[]>('/api/auth/user/notifications')

  return (
    <Layout>
      <div>Yo</div>
      <LoginForm />
      {/* {data && data.map((el,i) => {
        return <div key={i}>{el}</div>
      })} */}
    </Layout>
  )
}
