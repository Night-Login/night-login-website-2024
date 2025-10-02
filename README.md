# Night Login Website

## Overview

This is the official website for Night Login, a semi-independent organization under KMTETI FT UGM (Keluarga Mahasiswa Teknik Elektro dan Teknologi Informasi, Fakultas Teknik, Universitas Gadjah Mada). Night Login serves as a computer society for IT students in the Department of Electrical and Information Engineering at Universitas Gadjah Mada.

## About Night Login

Night Login is dedicated to fostering the growth and development of IT skills among students through various activities, workshops, competitions, and community projects. The organization provides a platform for students to explore and enhance their knowledge in computer science and information technology.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/night-login-website-2024.git
   cd night-login-website-2024
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables

   Copy `.env.example` to `.env` and fill in your values:

   ```bash
   cp .env.example .env
   ```

   Required environment variables:
   - `NEXT_PUBLIC_BACKEND_URL` - Your backend API URL
   - `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` - Your app URL (<http://localhost:3000> for dev)
   - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
   - `GITHUB_ID` and `GITHUB_SECRET` - From GitHub Developer Settings

4. Run the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## ⚠️ Security Notice

**Important:** This project has known security considerations that should be addressed before production deployment:

- JWT tokens are currently stored in `localStorage` which is vulnerable to XSS attacks
- Token validation in middleware needs enhancement
- Mixed authentication strategies need to be unified

Please read [SECURITY.md](./SECURITY.md) for detailed security recommendations and best practices before deploying to production.

## Building for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

- components - Reusable React components
- pages - Next.js pages
- styles - Global styles and Tailwind configuration
- public - Static assets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT (or specify your chosen license)

## Contact

For any inquiries about Night Login or this website, please contact [nl.nightlogin@gmail.com](mailto:nl.nightlogin@gmail.com)
\
