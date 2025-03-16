import React, { ReactNode } from "react";
import Footer from "../Footer";
import Head from "next/head";
import { useRouter } from "next/router";

type LayoutProps = {
  children: ReactNode;
  includeNavbar?: boolean;
};

export const Layout: React.FC<LayoutProps> = ({ children, includeNavbar = false }) => {
  const router = useRouter();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      {/* Main content with padding for fixed navbar */}
      <main className="flex-grow pt-[76px] sm:pt-[86px]">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};