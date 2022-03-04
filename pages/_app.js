import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import Page from '../components/Page'

function MyApp({ Component, pageProps }) {
  return <SessionProvider session={pageProps.session}>
    <Page>
      <Component {...pageProps} />
    </Page>
  </SessionProvider>
}


export default MyApp
