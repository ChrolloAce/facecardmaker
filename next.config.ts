import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper server-side rendering for Vercel
  output: 'standalone',
  
  // Disable static optimization for pages using client-side state
  experimental: {
    // Use server actions if needed
  },
};

export default nextConfig;
