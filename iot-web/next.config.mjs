/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  redirects: () => {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: false
      }
    ]
  }
};

export default nextConfig;
