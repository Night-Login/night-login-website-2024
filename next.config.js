/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'https://iai-captcha.vercel.app'],
  },
}

module.exports = nextConfig
