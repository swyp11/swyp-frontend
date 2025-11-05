import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGithubPages ? '/swyp-frontend' : '';

const nextConfig: NextConfig = {
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true, // GitHub Pages에서는 이미지 최적화 비활성화
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  output: isGithubPages ? 'export' : undefined, // 정적 export
};

export default nextConfig;
