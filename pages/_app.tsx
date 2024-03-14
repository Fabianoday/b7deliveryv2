import "@/styles/globals.css";
// import type { AppProps } from "next/app";

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }




import { Provider as AppContextProvider } from '@/contexts/app'
import { Provider as AuthContextProvider } from '@/contexts/auth'


//import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({Component, pageProps} : AppProps){
    return(
       <AppContextProvider>
            <AppContextProvider>
                <Component{...pageProps}/>
            </AppContextProvider>
        </AppContextProvider> 
    );

    //return <Component{...pageProps}/>
}

export default MyApp
