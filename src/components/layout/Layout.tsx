import React, { ReactNode } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Head from "next/head";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Navbar />
      
      {/* Main content with padding for fixed navbar */}
      <main className="flex-grow pt-[76px] sm:pt-[86px]">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};