import Hero from "@/components/Landing/Hero";
import Intro from "@/components/Landing/Intro";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function Home() {
  return (
    <>
    <Head>
      <title>Night Login</title>
    </Head>
    <main className="bg-neutral-1 min-h-screen">
      <Navbar />
      <Hero  />
      <Intro />
    </main></>
  );
}
