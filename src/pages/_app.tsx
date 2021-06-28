// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'// own css files here
import './styles.css'

// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
