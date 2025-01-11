import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { AppProps } from "next/app";
import "./../components/Logo/style.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.body.style.zoom = "85%";
  }, []);
  return (
    <>
      <Head>
        <title>Pasindu Chamod Madusha</title>
        <meta
          name="description"
          content="I'm Pasindu Chamod Madusha, a Computer Science & Engineering Undergraduate at the University of Moratuwa, with interests in Software Engineering, Web Development, Machine Learning, and AI. Currently a Software Engineer at Fcode Labs and an avid Medium blog writer."
        />
        <meta name="language" content="English" />
        <meta name="author" content="Pasindu Chamod Madusha" />

        {/* Open Graph / Linkedin / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://epcm18.com" />
        <meta
          property="og:site_name"
          content="Pasindu Chamod Madusha | Software Engineer"
        />
        <meta property="og:title" content="Pasindu Chamod Madusha" />
        <meta
          property="og:description"
          content="I'm Pasindu Chamod Madusha, a Computer Science & Engineering Undergraduate at the University of Moratuwa, with interests in Software Engineering, Web Development, Machine Learning, and AI. Currently a Software Engineer at Fcode Labs and an avid Medium blog writer."
        />
        <meta property="og:image" content="104779449.png" />
        <meta property="og:image:alt" content="Pasindu Chamod Madusha" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://x.com/epcm_18" />
        <meta property="twitter:site" content="@epcm_18" />
        <meta
          property="twitter:title"
          content="Pasindu Chamod Madusha | Software Engineer"
        />
        <meta
          property="twitter:description"
          content="Hello world! I'm Pasindu Chamod Madusha, a Computer Science & Engineering Undergraduate and a Software Engineer."
        />
        <meta property="twitter:image" content="104779449.png" />
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
