import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    remotePatterns : [
      { 
        protocol: "https",
        hostname: "blktgeoqzqapvwvbeuoj.supabase.co",
        pathname: "/storage/v1/object/public/products/**"
      }
    ]
  }
};

export default nextConfig;
