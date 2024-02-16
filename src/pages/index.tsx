import Footer from "@/components/Footer";
import Hero from "@/components/Landing/Hero";
import Intro from "@/components/Landing/Intro";
import Projects from "@/components/Landing/Projects";
import Solutions from "@/components/Landing/Solutions";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Night Login</title>
      </Head>
      <main className="bg-neutral-1 w-full min-h-screen flex flex-col justify-center overflow-x-hidden">
        <Hero  />
        <Intro />
        <Projects />
        <Solutions />
        <Footer />
      </main>
    </>
  );
}
