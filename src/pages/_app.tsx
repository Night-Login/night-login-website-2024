import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GoogleOAuthProvider } from '@react-oauth/google';
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
     <GoogleOAuthProvider clientId="563659778790-qrsvs7c8lh7libdqfo9tb9rge1dvgli0.apps.googleusercontent.com">
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
    </GoogleOAuthProvider>
    
    </>
  );
}
