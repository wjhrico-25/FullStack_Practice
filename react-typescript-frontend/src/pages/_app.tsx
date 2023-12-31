import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'

import theme from '../theme'
import { AppProps } from 'next/app'
import { Provider, createClient } from 'urql'

const client = createClient({ 
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

function MyApp({ Component, pageProps }: any) {
  return (    
      <Provider value={client}>
        <ThemeProvider theme={theme}>
          <ColorModeProvider>
            <CSSReset />
            <Component {...pageProps} />
          </ColorModeProvider>
        </ThemeProvider>    
      </Provider>
  )
}

export default MyApp
