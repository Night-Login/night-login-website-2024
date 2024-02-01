import Hero from "@/components/Landing/Hero";
import Intro from "@/components/Landing/Intro";
import Projects from "@/components/Landing/Projects";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Night Login</title>
      </Head>
      <main className="bg-neutral-1 w-full min-h-screen flex flex-col justify-center">
        <Navbar />
        <Hero  />
        <Intro />
        <Projects />
      </main>
    </>
  );
}
