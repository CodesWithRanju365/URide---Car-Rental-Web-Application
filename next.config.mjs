const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ap-south-1.graphassets.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
