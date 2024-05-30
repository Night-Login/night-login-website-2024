import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import AOS from "aos";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  const r = useRouter();
  useEffect(() => {
    AOS.init({
      once: false,
      duration: 800,
      easing: "ease-in-out",
    });
  }, []);
  return (

    <>

     <Head>
      <link rel="icon" href="/assets/images/Logo.png" />
    </Head>
    <main className="font-poppins">
      {
          !r.pathname.includes("/requests") 
          ? <Navbar /> 
          : null
      }
      <Component {...pageProps} />
    </main>
    
    </>
  );
}
