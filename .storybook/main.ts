import type { StorybookConfig } from "@storybook/nextjs-vite";
import path from 'path';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {
      nextConfigPath: '../next.config.ts',
    }
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    
    // GitHub Pages 배포를 위한 base path 설정
    if (process.env.GITHUB_PAGES === 'true') {
      config.base = '/swyp-frontend/';
      console.log('🔧 Storybook build config: GitHub Pages mode');
      console.log('   - config.base:', config.base);
    }
    
    // public 폴더의 정적 파일 처리
    if (!config.publicDir) {
      config.publicDir = '../public';
    }
    
    // 환경 변수를 빌드된 번들에 주입
    if (!config.define) {
      config.define = {};
    }
    config.define['process.env.NEXT_PUBLIC_BASE_PATH'] = JSON.stringify(basePath);
    config.define['process.env.__NEXT_ROUTER_BASEPATH'] = JSON.stringify(basePath);
    config.define['process.env.__NEXT_IMAGE_OPTS'] = JSON.stringify({
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      path: basePath + '/_next/image',
      loader: 'default',
    });
    
    console.log('🔧 Environment variables:');
    console.log('   - GITHUB_PAGES:', process.env.GITHUB_PAGES);
    console.log('   - NEXT_PUBLIC_BASE_PATH:', basePath);
    console.log('   - config.publicDir:', config.publicDir);
    console.log('   - Injected to bundle:', JSON.stringify(basePath));
    
    return config;
  }
};

export default config;