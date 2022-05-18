import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

const activeChainID = ChainId.Rinkeby;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainID}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
