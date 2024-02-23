import type { AppProps } from "next/app";
import Head from "next/head";
import { AuthUserProvider } from "../firebase/auth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthUserProvider>
        <Head>
          <title>Tripify</title>
        </Head>
        <Component {...pageProps} />
      </AuthUserProvider>
    </>
  );
}

export default MyApp;
