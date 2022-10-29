import '../styles/globals.css'
import { ThemeProvider } from "next-themes"
import { StarknetConfig, InjectedConnector } from "@starknet-react/core"

function MyApp({ Component, pageProps }) {
  const connectors = [
    // new InjectedConnector({ options: { id: "braavos" } }),
    new InjectedConnector({ options: { id: "argentX" } }),
  ]
  return (
    <StarknetConfig connectors={connectors}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </StarknetConfig>
  )
}

export default MyApp
