/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.sandbox.midtrans.com",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "iai-captcha.vercel.app",
        port: "",
        pathname: "/captcha",
      },
    ],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "api.sandbox.midtrans.com",
  //       port: "",
  //       pathname: "/*",
  //     },
  //     {
  //       protocol: "https",
  //       hostname: "iai-captcha.vercel.app",
  //       port: "",
  //       pathname: "/captcha",
  //     },
  //   ],
  // }
};

module.exports = nextConfig;
