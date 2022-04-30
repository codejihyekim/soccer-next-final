import '@/styles/globals.css'
import { wrapper } from '@/modules/store'
import {Nav, Header, Footer, Layout} from "@/components";
const App = ({ Component, pageProps }) => {
  return (<>
    <Nav/>
    <Header/>
    <Layout>
     <Component {...pageProps} />
    </Layout>
  <Footer/>
  </>)
}
export default wrapper.withRedux(App)
