import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_BASE_PATH: "",
    NEXT_PUBLIC_BUILD_ID: Date.now().toString(),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
