/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.sandbox.midtrans.com", "iai-captcha.vercel.app"],
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
        pathname: "/captchas/*",
      },
    ],
  },
};

module.exports = nextConfig;
