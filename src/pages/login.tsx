import Layout from '../components/layout'

export default function Login() {
  return (
    <Layout>
      <Auth />
    </Layout>
  )
}
// Static render
export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

const Auth = () => {
  return (
    <div>
      <h3>Login</h3>
      <input placeholder="email@domain.dk" type="email" name="email" id="email" />
      <input minLength={8} type="password" name="pass" id="pass" />
      <button type="submit">Login</button>
    </div>
  )
}
