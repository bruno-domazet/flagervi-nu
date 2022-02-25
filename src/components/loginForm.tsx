import useUser from '../lib/useAuth'
import LogoutBtn from './logoutBtn'
import styles from './loginForm.module.scss'

export default function LoginForm() {
  const { user, mutateUser } = useUser()

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

  if (user) {
    // logout
    return <LogoutBtn />
  }

  return (
    <>
      <form className="d-flex" onSubmit={handleSubmit}>
        <h3>Login/opret bruger</h3>
        <label htmlFor="email">
          <input className="form-control" type="email" placeholder={'email@domæne.com'} name="email" id="email" />
        </label>

        <label htmlFor="password">
          <input className="form-control" type="password" name="password" id="password" />
        </label>
        <button type="submit" className={['btn', 'btn-outline-success', styles.btn].join(' ')}>
          login
        </button>
      </form>
    </>
  )
}
