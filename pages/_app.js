import Layout from '../components/Layout.js'
import '../styles/globals.css'
import store from '../redux/store.js'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
    )
}

export default MyApp