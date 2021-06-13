export default function Auth() {
  return (
    <div>
      <h3>Login</h3>
      <input placeholder="email@domain.dk" type="email" name="email" id="email" />
      <input minLength={8} type="password" name="pass" id="pass" />
      <button type="submit">Login</button>
    </div>
  )
}
