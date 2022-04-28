import '@/styles/globals.css'
import { wrapper } from '@/modules/store'
import {Nav, Header, Footer} from "@/components";
const App = ({ Component, pageProps }) => {
  return (<>
    <Nav/>
    <Header/>
  <Component {...pageProps} />
  <Footer/>
  </>)
  
}

export default wrapper.withRedux(App)
