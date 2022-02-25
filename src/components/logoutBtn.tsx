import useUser from '../lib/useAuth'
// import styles from './logoutBtn.module.scss'

export default function LogoutBtn() {
  const { user, mutateUser } = useUser()
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
}
