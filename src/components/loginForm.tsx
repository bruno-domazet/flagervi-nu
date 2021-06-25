import useUser from '../lib/useAuth'

export default function LoginForm() {
  const { user, mutateUser } = useUser()
  console.log(`user`, user)

  const handleSubmit = async e => {
    e.preventDefault()

    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    }

    try {
      mutateUser(
        await (
          await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
        ).json()
      )
    } catch (err) {
      console.error(err)
    }
  }
  // onLogout
  const handleLogout = async e => {
    e.preventDefault()

    try {
      mutateUser(
        await (
          await fetch('api/auth/logout', {
            method: 'POST',
          })
        ).json()
      )
    } catch (err) {
      console.log(err)
    }
  }

  if (user) {
    // logout
    return (
      <form onSubmit={handleLogout} action={'api/auth/logout'}>
        <button type="submit">Logout</button>
      </form>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Login/opret bruger</h3>
        <label htmlFor="email">
          <input type="email" placeholder={'email@domæne.com'} name="email" id="email" />
        </label>

        <label htmlFor="password">
          <input type="password" name="password" id="password" />
        </label>
        <button type="submit">login</button>
      </form>
    </>
  )
}
