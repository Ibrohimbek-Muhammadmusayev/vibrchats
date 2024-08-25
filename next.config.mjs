/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'devices-fixer.com',
          },
          {
            protocol: 'https',
            hostname: 'cdn.onlinewebfonts.com',
          },
          {
            protocol: 'https',
            hostname: 'cdn4.iconfinder.com',
          },
        ],
      },
};

export default nextConfig;
