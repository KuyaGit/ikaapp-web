import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/ikaapp-web" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/ikaapp-web" : "",
    NEXT_PUBLIC_BUILD_ID: Date.now().toString(),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
