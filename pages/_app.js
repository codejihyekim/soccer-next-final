import '@/styles/globals.css'
import { Nav, Header, Layout, Footer} from '@/components'
import { wrapper } from '@/modules/store.js'
import styles from "@/styles/Header.module.css";


const App = ({ Component, pageProps }) => {
  return (<div>
    <Nav/>
      <Header className={styles.header}/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Footer/>
      </div>
    )
}

export default wrapper.withRedux(App)
